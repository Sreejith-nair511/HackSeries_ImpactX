import { 
  getAvailableResources, 
  requestEmergencyResources, 
  trackResourceRequest, 
  getResourceTypes, 
  getResourceStatistics 
} from '../emergencyResourceTracker';

describe('Emergency Resource Tracker Utils', () => {
  test('should get available resources for all regions', () => {
    const resources = getAvailableResources();
    expect(resources).toBeInstanceOf(Array);
    expect(resources.length).toBeGreaterThan(0);
    
    // Check that each resource has required properties
    resources.forEach(resource => {
      expect(resource).toHaveProperty('id');
      expect(resource).toHaveProperty('name');
      expect(resource).toHaveProperty('type');
      expect(resource).toHaveProperty('quantity');
      expect(resource).toHaveProperty('unit');
      expect(resource).toHaveProperty('location');
      expect(resource).toHaveProperty('contact');
      expect(resource).toHaveProperty('availability');
      expect(resource).toHaveProperty('region');
    });
  });

  test('should filter resources by region', () => {
    const keralaResources = getAvailableResources('Kerala');
    expect(keralaResources).toBeInstanceOf(Array);
    expect(keralaResources.length).toBeGreaterThan(0);
    
    // All resources should be from Kerala
    keralaResources.forEach(resource => {
      expect(resource.region).toBe('Kerala');
    });
  });

  test('should request emergency resources', () => {
    const request = {
      resourceType: 'medical',
      quantity: 100,
      urgency: 'high',
      location: 'Test Location',
      contact: '+91-0000000000'
    };
    
    const result = requestEmergencyResources(request);
    
    expect(result).toHaveProperty('requestId');
    expect(result.requestId).toMatch(/^REQ-/);
    expect(result.status).toBe('submitted');
    expect(result.timestamp).toBeDefined();
    expect(result.estimatedDelivery).toBeDefined();
    expect(result.resourceType).toBe(request.resourceType);
    expect(result.quantity).toBe(request.quantity);
    expect(result.urgency).toBe(request.urgency);
    expect(result.location).toBe(request.location);
    expect(result.contact).toBe(request.contact);
  });

  test('should track resource request', () => {
    const requestId = 'REQ-1234';
    const status = trackResourceRequest(requestId);
    
    expect(status).toHaveProperty('requestId', requestId);
    expect(status).toHaveProperty('status');
    expect(status).toHaveProperty('lastUpdated');
    expect(status).toHaveProperty('location');
    
    // Status should be one of the valid statuses
    const validStatuses = ['submitted', 'processing', 'dispatched', 'delivered'];
    expect(validStatuses).toContain(status.status);
  });

  test('should get resource types', () => {
    const types = getResourceTypes();
    expect(types).toBeInstanceOf(Array);
    expect(types.length).toBeGreaterThan(0);
    
    types.forEach(type => {
      expect(type).toHaveProperty('id');
      expect(type).toHaveProperty('name');
      expect(type).toHaveProperty('icon');
    });
  });

  test('should get resource statistics', () => {
    const stats = getResourceStatistics();
    
    expect(stats).toHaveProperty('totalResources');
    expect(stats).toHaveProperty('allocatedResources');
    expect(stats).toHaveProperty('availableResources');
    expect(stats).toHaveProperty('pendingRequests');
    expect(stats).toHaveProperty('fulfilledRequests');
    expect(stats).toHaveProperty('responseRate');
    
    // Values should be numbers or strings representing numbers
    expect(typeof stats.totalResources).toBe('number');
    expect(typeof stats.allocatedResources).toBe('number');
    expect(typeof stats.availableResources).toBe('number');
    expect(typeof stats.pendingRequests).toBe('number');
    expect(typeof stats.fulfilledRequests).toBe('number');
    expect(typeof stats.responseRate).toBe('string');
  });
});