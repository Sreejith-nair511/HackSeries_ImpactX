import { 
  getRecoveryStatus, 
  getRecoveryTasks, 
  getRecoveryFunding, 
  getCommunityIndicators,
  getRecoveryTimeline
} from '../disasterRecoveryStatus';

describe('Disaster Recovery Status Utils', () => {
  test('should get recovery status for a region', () => {
    const status = getRecoveryStatus('Kerala');
    
    expect(status).toHaveProperty('overallProgress');
    expect(status).toHaveProperty('phases');
    expect(status).toHaveProperty('keyMetrics');
    expect(status).toHaveProperty('lastUpdated');
    
    expect(typeof status.overallProgress).toBe('number');
    expect(status.overallProgress).toBeGreaterThanOrEqual(0);
    expect(status.overallProgress).toBeLessThanOrEqual(100);
    
    // Check phases structure
    expect(status.phases).toHaveProperty('immediate');
    expect(status.phases).toHaveProperty('shortTerm');
    expect(status.phases).toHaveProperty('mediumTerm');
    expect(status.phases).toHaveProperty('longTerm');
    
    // Check key metrics
    expect(status.keyMetrics).toHaveProperty('homesRebuilt');
    expect(status.keyMetrics).toHaveProperty('infrastructureRestored');
    expect(status.keyMetrics).toHaveProperty('economicRecovery');
    expect(status.keyMetrics).toHaveProperty('communityResilience');
  });

  test('should get recovery tasks for a region', () => {
    const tasks = getRecoveryTasks('Kerala');
    
    expect(tasks).toBeInstanceOf(Array);
    expect(tasks.length).toBeGreaterThan(0);
    
    // Check task structure
    tasks.forEach(task => {
      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('description');
      expect(task).toHaveProperty('priority');
      expect(task).toHaveProperty('status');
      expect(task).toHaveProperty('progress');
      expect(task).toHaveProperty('assignedTo');
      expect(task).toHaveProperty('estimatedCompletion');
      
      // Validate progress is between 0 and 100
      expect(task.progress).toBeGreaterThanOrEqual(0);
      expect(task.progress).toBeLessThanOrEqual(100);
      
      // Validate status values
      const validStatuses = ['not-started', 'in-progress', 'completed'];
      expect(validStatuses).toContain(task.status);
      
      // Validate priority values
      const validPriorities = ['low', 'medium', 'high', 'critical'];
      expect(validPriorities).toContain(task.priority);
    });
  });

  test('should get recovery funding information', () => {
    const funding = getRecoveryFunding('Kerala');
    
    expect(funding).toHaveProperty('totalAllocated');
    expect(funding).toHaveProperty('totalDisbursed');
    expect(funding).toHaveProperty('totalUtilized');
    expect(funding).toHaveProperty('remaining');
    expect(funding).toHaveProperty('fundingSources');
    expect(funding).toHaveProperty('lastUpdated');
    
    // Check numeric values
    expect(typeof funding.totalAllocated).toBe('number');
    expect(typeof funding.totalDisbursed).toBe('number');
    expect(typeof funding.totalUtilized).toBe('number');
    expect(typeof funding.remaining).toBe('number');
    
    // Check funding sources
    expect(funding.fundingSources).toBeInstanceOf(Array);
    expect(funding.fundingSources.length).toBeGreaterThan(0);
    
    funding.fundingSources.forEach(source => {
      expect(source).toHaveProperty('source');
      expect(source).toHaveProperty('amount');
      expect(source).toHaveProperty('percentage');
      
      expect(typeof source.amount).toBe('number');
      expect(typeof source.percentage).toBe('number');
      
      expect(source.percentage).toBeGreaterThanOrEqual(0);
      expect(source.percentage).toBeLessThanOrEqual(100);
    });
  });

  test('should get community recovery indicators', () => {
    const indicators = getCommunityIndicators('Kerala');
    
    expect(indicators).toHaveProperty('populationReturn');
    expect(indicators).toHaveProperty('employmentRate');
    expect(indicators).toHaveProperty('healthcareAccess');
    expect(indicators).toHaveProperty('educationContinuity');
    expect(indicators).toHaveProperty('mentalHealthSupport');
    expect(indicators).toHaveProperty('communityEngagement');
    expect(indicators).toHaveProperty('lastUpdated');
    
    // Check that all indicators are percentages
    Object.entries(indicators).forEach(([key, value]) => {
      if (key !== 'lastUpdated') {
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
      }
    });
  });

  test('should get recovery timeline', () => {
    const timeline = getRecoveryTimeline('Kerala');
    
    expect(timeline).toBeInstanceOf(Array);
    expect(timeline.length).toBeGreaterThan(0);
    
    timeline.forEach(event => {
      expect(event).toHaveProperty('date');
      expect(event).toHaveProperty('event');
      expect(event).toHaveProperty('description');
      expect(event).toHaveProperty('milestone');
      
      // Validate date format
      expect(() => new Date(event.date)).not.toThrow();
      
      // Validate milestone is boolean
      expect(typeof event.milestone).toBe('boolean');
    });
  });

  test('should return default status for unknown region', () => {
    const status = getRecoveryStatus('UnknownRegion');
    
    // Should return Kerala data as default
    expect(status).toHaveProperty('overallProgress');
    expect(typeof status.overallProgress).toBe('number');
  });
});