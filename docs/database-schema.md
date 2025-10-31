# Database Schema Documentation

This document describes the database schema for the ImpactX disaster response platform, including tables, relationships, and data models.

## Overview

The ImpactX platform uses a relational database to store disaster reports, resources, alerts, user information, and other critical data. This document provides a comprehensive overview of the database structure.

## Database Technology

- **Primary Database**: PostgreSQL 14+
- **ORM**: Prisma (for Node.js backend)
- **Connection Pooling**: PgBouncer
- **Backup Strategy**: Automated daily backups with point-in-time recovery

## Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ REPORTS : creates
    USERS ||--o{ ALERTS : issues
    USERS ||--o{ RESOURCES : manages
    REGIONS ||--o{ REPORTS : contains
    REGIONS ||--o{ RESOURCES : contains
    REGIONS ||--o{ ALERTS : covers
    REPORT_TYPES ||--o{ REPORTS : classifies
    SEVERITY_LEVELS ||--o{ REPORTS : rates
    RESOURCE_TYPES ||--o{ RESOURCES : categorizes
    REPORTS ||--o{ REPORT_COMMENTS : has
    REPORTS ||--o{ REPORT_ATTACHMENTS : includes
    REPORTS ||--o{ REPORT_STATUS_HISTORY : tracks
    RESOURCES ||--o{ RESOURCE_STATUS_HISTORY : tracks
    ALERTS ||--o{ ALERT_TARGETS : notifies
    USERS ||--o{ USER_ROLES : assigned
    ROLES ||--o{ ROLE_PERMISSIONS : has

    USERS {
        string id PK
        string email UK
        string password_hash
        string first_name
        string last_name
        string phone
        string role_id FK
        datetime created_at
        datetime updated_at
        boolean is_active
        json preferences
    }

    REGIONS {
        string id PK
        string name
        string code UK
        string description
        json boundaries
        datetime created_at
        datetime updated_at
    }

    REPORT_TYPES {
        string id PK
        string name
        string description
        boolean is_active
    }

    SEVERITY_LEVELS {
        string id PK
        string name
        string description
        integer level
        string color_code
    }

    REPORTS {
        string id PK
        string user_id FK
        string region_id FK
        string report_type_id FK
        string severity_level_id FK
        string title
        text description
        json location
        string status
        datetime reported_at
        datetime resolved_at
        datetime created_at
        datetime updated_at
    }

    REPORT_COMMENTS {
        string id PK
        string report_id FK
        string user_id FK
        text content
        datetime created_at
        datetime updated_at
    }

    REPORT_ATTACHMENTS {
        string id PK
        string report_id FK
        string file_name
        string file_path
        string mime_type
        integer file_size
        datetime uploaded_at
    }

    REPORT_STATUS_HISTORY {
        string id PK
        string report_id FK
        string status
        string changed_by FK
        text notes
        datetime changed_at
    }

    RESOURCE_TYPES {
        string id PK
        string name
        string description
        boolean is_active
    }

    RESOURCES {
        string id PK
        string name
        string description
        string region_id FK
        string resource_type_id FK
        string contact_person
        string contact_phone
        string contact_email
        json location
        integer capacity
        integer current_usage
        string status
        datetime created_at
        datetime updated_at
    }

    RESOURCE_STATUS_HISTORY {
        string id PK
        string resource_id FK
        string status
        string changed_by FK
        text notes
        datetime changed_at
    }

    ALERTS {
        string id PK
        string title
        text message
        string region_id FK
        string issued_by FK
        datetime issued_at
        datetime expires_at
        string priority
        string status
        datetime created_at
        datetime updated_at
    }

    ALERT_TARGETS {
        string id PK
        string alert_id FK
        string target_type
        string target_id
        boolean is_read
        datetime read_at
    }

    ROLES {
        string id PK
        string name
        string description
        boolean is_active
        datetime created_at
    }

    USER_ROLES {
        string user_id FK
        string role_id FK
        datetime assigned_at
        string assigned_by FK
        PRIMARY KEY (user_id, role_id)
    }

    ROLE_PERMISSIONS {
        string role_id FK
        string permission
        datetime granted_at
        PRIMARY KEY (role_id, permission)
    }
```

## Tables

### Users

Stores user account information and authentication data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique user identifier |
| email | VARCHAR(255) | UK, NOT NULL | User's email address |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password |
| first_name | VARCHAR(100) | NOT NULL | User's first name |
| last_name | VARCHAR(100) | NOT NULL | User's last name |
| phone | VARCHAR(20) | | User's phone number |
| role_id | UUID | FK | Reference to user's primary role |
| created_at | TIMESTAMP | NOT NULL | Account creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |
| is_active | BOOLEAN | NOT NULL, DEFAULT true | Account status |
| preferences | JSONB | | User preferences and settings |

### Regions

Defines geographical regions for organizing disaster response efforts.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique region identifier |
| name | VARCHAR(255) | NOT NULL | Region name |
| code | VARCHAR(50) | UK, NOT NULL | Unique region code |
| description | TEXT | | Region description |
| boundaries | JSONB | | Geographical boundaries (GeoJSON) |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |

### Report Types

Defines categories of disaster reports.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique report type identifier |
| name | VARCHAR(100) | NOT NULL, UK | Report type name |
| description | TEXT | | Report type description |
| is_active | BOOLEAN | NOT NULL, DEFAULT true | Type availability status |

### Severity Levels

Defines severity levels for disaster reports.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique severity level identifier |
| name | VARCHAR(50) | NOT NULL, UK | Severity level name |
| description | TEXT | | Severity level description |
| level | INTEGER | NOT NULL | Numeric severity level (1-5) |
| color_code | VARCHAR(7) | | Hex color code for UI display |

### Reports

Stores disaster reports submitted by users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique report identifier |
| user_id | UUID | FK, NOT NULL | User who submitted the report |
| region_id | UUID | FK, NOT NULL | Region where incident occurred |
| report_type_id | UUID | FK, NOT NULL | Type of report |
| severity_level_id | UUID | FK, NOT NULL | Severity level |
| title | VARCHAR(255) | NOT NULL | Report title |
| description | TEXT | NOT NULL | Detailed description |
| location | JSONB | NOT NULL | Location data (coordinates, address) |
| status | VARCHAR(50) | NOT NULL, DEFAULT 'pending' | Report status |
| reported_at | TIMESTAMP | NOT NULL | When incident was reported |
| resolved_at | TIMESTAMP | | When incident was resolved |
| created_at | TIMESTAMP | NOT NULL | Record creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |

### Report Comments

Stores comments on disaster reports.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique comment identifier |
| report_id | UUID | FK, NOT NULL | Report being commented on |
| user_id | UUID | FK, NOT NULL | User who made the comment |
| content | TEXT | NOT NULL | Comment content |
| created_at | TIMESTAMP | NOT NULL | Comment creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |

### Report Attachments

Stores file attachments for disaster reports.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique attachment identifier |
| report_id | UUID | FK, NOT NULL | Report the attachment belongs to |
| file_name | VARCHAR(255) | NOT NULL | Original file name |
| file_path | VARCHAR(500) | NOT NULL | Path to stored file |
| mime_type | VARCHAR(100) | NOT NULL | File MIME type |
| file_size | INTEGER | NOT NULL | File size in bytes |
| uploaded_at | TIMESTAMP | NOT NULL | Upload timestamp |

### Report Status History

Tracks status changes for disaster reports.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique history identifier |
| report_id | UUID | FK, NOT NULL | Report being tracked |
| status | VARCHAR(50) | NOT NULL | Status value |
| changed_by | UUID | FK, NOT NULL | User who changed status |
| notes | TEXT | | Additional notes |
| changed_at | TIMESTAMP | NOT NULL | When status was changed |

### Resource Types

Defines categories of emergency resources.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique resource type identifier |
| name | VARCHAR(100) | NOT NULL, UK | Resource type name |
| description | TEXT | | Resource type description |
| is_active | BOOLEAN | NOT NULL, DEFAULT true | Type availability status |

### Resources

Stores information about emergency resources.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique resource identifier |
| name | VARCHAR(255) | NOT NULL | Resource name |
| description | TEXT | | Resource description |
| region_id | UUID | FK, NOT NULL | Region where resource is located |
| resource_type_id | UUID | FK, NOT NULL | Type of resource |
| contact_person | VARCHAR(255) | | Contact person name |
| contact_phone | VARCHAR(20) | | Contact phone number |
| contact_email | VARCHAR(255) | | Contact email address |
| location | JSONB | NOT NULL | Location data (coordinates, address) |
| capacity | INTEGER | | Maximum capacity |
| current_usage | INTEGER | DEFAULT 0 | Current usage count |
| status | VARCHAR(50) | NOT NULL, DEFAULT 'available' | Resource status |
| created_at | TIMESTAMP | NOT NULL | Record creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |

### Resource Status History

Tracks status changes for emergency resources.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique history identifier |
| resource_id | UUID | FK, NOT NULL | Resource being tracked |
| status | VARCHAR(50) | NOT NULL | Status value |
| changed_by | UUID | FK, NOT NULL | User who changed status |
| notes | TEXT | | Additional notes |
| changed_at | TIMESTAMP | NOT NULL | When status was changed |

### Alerts

Stores emergency alerts issued to the public.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique alert identifier |
| title | VARCHAR(255) | NOT NULL | Alert title |
| message | TEXT | NOT NULL | Alert message content |
| region_id | UUID | FK, NOT NULL | Region affected by alert |
| issued_by | UUID | FK, NOT NULL | User who issued alert |
| issued_at | TIMESTAMP | NOT NULL | When alert was issued |
| expires_at | TIMESTAMP | | When alert expires |
| priority | VARCHAR(50) | NOT NULL | Alert priority level |
| status | VARCHAR(50) | NOT NULL, DEFAULT 'active' | Alert status |
| created_at | TIMESTAMP | NOT NULL | Record creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last update timestamp |

### Alert Targets

Tracks who has received or read an alert.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique target identifier |
| alert_id | UUID | FK, NOT NULL | Alert being tracked |
| target_type | VARCHAR(50) | NOT NULL | Type of target (user, group, region) |
| target_id | VARCHAR(255) | NOT NULL | Identifier of target |
| is_read | BOOLEAN | NOT NULL, DEFAULT false | Whether target has read alert |
| read_at | TIMESTAMP | | When target read alert |

### Roles

Defines user roles and permissions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique role identifier |
| name | VARCHAR(100) | NOT NULL, UK | Role name |
| description | TEXT | | Role description |
| is_active | BOOLEAN | NOT NULL, DEFAULT true | Role availability status |
| created_at | TIMESTAMP | NOT NULL | Role creation timestamp |

### User Roles

Associates users with roles (many-to-many relationship).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| user_id | UUID | FK, PK | User identifier |
| role_id | UUID | FK, PK | Role identifier |
| assigned_at | TIMESTAMP | NOT NULL | When role was assigned |
| assigned_by | UUID | FK | User who assigned role |

### Role Permissions

Defines permissions granted to roles.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| role_id | UUID | FK, PK | Role identifier |
| permission | VARCHAR(100) | PK | Permission name |
| granted_at | TIMESTAMP | NOT NULL | When permission was granted |

## Indexes

### Performance Indexes

```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role_id);

-- Reports
CREATE INDEX idx_reports_user ON reports(user_id);
CREATE INDEX idx_reports_region ON reports(region_id);
CREATE INDEX idx_reports_type ON reports(report_type_id);
CREATE INDEX idx_reports_severity ON reports(severity_level_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_reported_at ON reports(reported_at);

-- Resources
CREATE INDEX idx_resources_region ON resources(region_id);
CREATE INDEX idx_resources_type ON resources(resource_type_id);
CREATE INDEX idx_resources_status ON resources(status);

-- Alerts
CREATE INDEX idx_alerts_region ON alerts(region_id);
CREATE INDEX idx_alerts_issued_by ON alerts(issued_by);
CREATE INDEX idx_alerts_priority ON alerts(priority);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_issued_at ON alerts(issued_at);

-- History tables
CREATE INDEX idx_report_status_history_report ON report_status_history(report_id);
CREATE INDEX idx_report_status_history_changed_at ON report_status_history(changed_at);
CREATE INDEX idx_resource_status_history_resource ON resource_status_history(resource_id);
CREATE INDEX idx_resource_status_history_changed_at ON resource_status_history(changed_at);
```

## Constraints

### Foreign Key Constraints

```sql
-- Users
ALTER TABLE users ADD CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id);

-- Reports
ALTER TABLE reports ADD CONSTRAINT fk_reports_user FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE reports ADD CONSTRAINT fk_reports_region FOREIGN KEY (region_id) REFERENCES regions(id);
ALTER TABLE reports ADD CONSTRAINT fk_reports_type FOREIGN KEY (report_type_id) REFERENCES report_types(id);
ALTER TABLE reports ADD CONSTRAINT fk_reports_severity FOREIGN KEY (severity_level_id) REFERENCES severity_levels(id);

-- Report Comments
ALTER TABLE report_comments ADD CONSTRAINT fk_report_comments_report FOREIGN KEY (report_id) REFERENCES reports(id);
ALTER TABLE report_comments ADD CONSTRAINT fk_report_comments_user FOREIGN KEY (user_id) REFERENCES users(id);

-- Report Attachments
ALTER TABLE report_attachments ADD CONSTRAINT fk_report_attachments_report FOREIGN KEY (report_id) REFERENCES reports(id);

-- Report Status History
ALTER TABLE report_status_history ADD CONSTRAINT fk_report_status_history_report FOREIGN KEY (report_id) REFERENCES reports(id);
ALTER TABLE report_status_history ADD CONSTRAINT fk_report_status_history_changed_by FOREIGN KEY (changed_by) REFERENCES users(id);

-- Resources
ALTER TABLE resources ADD CONSTRAINT fk_resources_region FOREIGN KEY (region_id) REFERENCES regions(id);
ALTER TABLE resources ADD CONSTRAINT fk_resources_type FOREIGN KEY (resource_type_id) REFERENCES resource_types(id);

-- Resource Status History
ALTER TABLE resource_status_history ADD CONSTRAINT fk_resource_status_history_resource FOREIGN KEY (resource_id) REFERENCES resources(id);
ALTER TABLE resource_status_history ADD CONSTRAINT fk_resource_status_history_changed_by FOREIGN KEY (changed_by) REFERENCES users(id);

-- Alerts
ALTER TABLE alerts ADD CONSTRAINT fk_alerts_region FOREIGN KEY (region_id) REFERENCES regions(id);
ALTER TABLE alerts ADD CONSTRAINT fk_alerts_issued_by FOREIGN KEY (issued_by) REFERENCES users(id);

-- Alert Targets
ALTER TABLE alert_targets ADD CONSTRAINT fk_alert_targets_alert FOREIGN KEY (alert_id) REFERENCES alerts(id);

-- User Roles
ALTER TABLE user_roles ADD CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE user_roles ADD CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id);

-- Role Permissions
ALTER TABLE role_permissions ADD CONSTRAINT fk_role_permissions_role FOREIGN KEY (role_id) REFERENCES roles(id);
```

## Triggers

### Audit Triggers

```sql
-- Update updated_at timestamp on record changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to tables that need updated_at tracking
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON alerts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_regions_updated_at BEFORE UPDATE ON regions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Status History Triggers

```sql
-- Automatically record status changes for reports
CREATE OR REPLACE FUNCTION record_report_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO report_status_history (
            report_id,
            status,
            changed_by,
            changed_at
        ) VALUES (
            NEW.id,
            NEW.status,
            NEW.updated_by, -- Assuming this column exists
            CURRENT_TIMESTAMP
        );
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER report_status_change_trigger AFTER UPDATE ON reports
    FOR EACH ROW EXECUTE FUNCTION record_report_status_change();

-- Automatically record status changes for resources
CREATE OR REPLACE FUNCTION record_resource_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO resource_status_history (
            resource_id,
            status,
            changed_by,
            changed_at
        ) VALUES (
            NEW.id,
            NEW.status,
            NEW.updated_by, -- Assuming this column exists
            CURRENT_TIMESTAMP
        );
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER resource_status_change_trigger AFTER UPDATE ON resources
    FOR EACH ROW EXECUTE FUNCTION record_resource_status_change();
```

## Views

### Common Queries as Views

```sql
-- Active reports with location information
CREATE VIEW active_reports AS
SELECT 
    r.id,
    r.title,
    r.description,
    rt.name as report_type,
    sl.name as severity_level,
    sl.color_code as severity_color,
    reg.name as region_name,
    r.location,
    r.reported_at,
    u.first_name || ' ' || u.last_name as reporter_name
FROM reports r
JOIN report_types rt ON r.report_type_id = rt.id
JOIN severity_levels sl ON r.severity_level_id = sl.id
JOIN regions reg ON r.region_id = reg.id
JOIN users u ON r.user_id = u.id
WHERE r.status IN ('pending', 'confirmed', 'in_progress');

-- Available resources by region
CREATE VIEW available_resources AS
SELECT 
    res.id,
    res.name,
    res.description,
    rt.name as resource_type,
    reg.name as region_name,
    res.capacity,
    res.current_usage,
    res.capacity - res.current_usage as available_capacity,
    res.location
FROM resources res
JOIN resource_types rt ON res.resource_type_id = rt.id
JOIN regions reg ON res.region_id = reg.id
WHERE res.status = 'available' AND res.capacity > res.current_usage;

-- Recent alerts
CREATE VIEW recent_alerts AS
SELECT 
    a.id,
    a.title,
    a.message,
    a.priority,
    reg.name as region_name,
    u.first_name || ' ' || u.last_name as issuer_name,
    a.issued_at,
    a.expires_at
FROM alerts a
JOIN regions reg ON a.region_id = reg.id
JOIN users u ON a.issued_by = u.id
WHERE a.status = 'active' AND a.expires_at > CURRENT_TIMESTAMP
ORDER BY a.issued_at DESC;
```

## Stored Procedures

### Common Operations

```sql
-- Resolve a report and update status
CREATE OR REPLACE FUNCTION resolve_report(
    report_id UUID,
    resolver_id UUID,
    resolution_notes TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    UPDATE reports 
    SET 
        status = 'resolved',
        resolved_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = report_id;
    
    INSERT INTO report_status_history (
        report_id,
        status,
        changed_by,
        notes,
        changed_at
    ) VALUES (
        report_id,
        'resolved',
        resolver_id,
        resolution_notes,
        CURRENT_TIMESTAMP
    );
END;
$$ LANGUAGE plpgsql;

-- Update resource usage
CREATE OR REPLACE FUNCTION update_resource_usage(
    resource_id UUID,
    usage_change INTEGER
)
RETURNS VOID AS $$
BEGIN
    UPDATE resources 
    SET 
        current_usage = current_usage + usage_change,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = resource_id;
END;
$$ LANGUAGE plpgsql;
```

## Backup and Recovery

### Backup Strategy

- **Full backups**: Daily at 2:00 AM
- **Incremental backups**: Every 4 hours
- **Point-in-time recovery**: WAL archiving enabled
- **Retention**: 30 days of backups

### Recovery Procedures

```bash
# Restore from latest backup
pg_restore -d impactx_production latest_backup.dump

# Point-in-time recovery
pg_restore -d impactx_production -t reports backup_before_incident.dump
```

## Performance Considerations

### Query Optimization

1. **Use indexes** on frequently queried columns
2. **Limit result sets** with appropriate LIMIT clauses
3. **Use EXPLAIN ANALYZE** to identify slow queries
4. **Consider partitioning** for large tables (reports, history)

### Connection Management

- Use connection pooling (PgBouncer)
- Configure appropriate pool sizes
- Monitor connection usage
- Implement connection timeouts

## Security

### Data Protection

- All sensitive data is encrypted at rest
- Passwords are hashed using bcrypt
- Database connections use SSL/TLS
- Regular security audits

### Access Control

- Role-based access control (RBAC)
- Principle of least privilege
- Regular access reviews
- Audit logging for all database access

## Monitoring

### Key Metrics

- Query performance
- Connection pool usage
- Disk space utilization
- Backup success rates
- Replication lag (if using replication)

### Alerting

- Slow query alerts
- Connection pool exhaustion alerts
- Disk space alerts
- Backup failure alerts

## Migration Strategy

### Schema Changes

1. **Version control** all schema changes
2. **Test migrations** in staging environment
3. **Rollback plans** for all migrations
4. **Zero-downtime** deployments when possible

### Data Migration

```sql
-- Example migration script
-- Migration: Add priority column to reports
-- Version: 1.2.0

-- Add column
ALTER TABLE reports ADD COLUMN priority VARCHAR(50) DEFAULT 'normal';

-- Update existing records
UPDATE reports SET priority = 'high' WHERE severity_level_id IN (
    SELECT id FROM severity_levels WHERE level >= 4
);

-- Add constraints
ALTER TABLE reports ALTER COLUMN priority SET NOT NULL;
```

## Future Considerations

### Scalability

- Horizontal partitioning for large tables
- Read replicas for reporting queries
- Caching layer for frequently accessed data
- Geographic distribution for disaster recovery

### New Features

- Real-time notifications using PostgreSQL LISTEN/NOTIFY
- Full-text search for report descriptions
- Geographic indexing for location-based queries
- Time-series data for trend analysis

This database schema provides a solid foundation for the ImpactX disaster response platform, with room for growth and optimization as the system evolves.