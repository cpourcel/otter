import {computeConfigurationName} from '@o3r/configuration';
import type {Configuration, NestedConfiguration} from '@o3r/core';

/** Configuration of a destination */
export interface DestinationConfiguration extends NestedConfiguration {
  /**
   * Name of the destination's city
   */
  cityName: string;
  /**
   * Is the destination available
   */
  available: boolean;
}

/**
 * Component configuration example
 */
export interface ConfigurationPresConfig extends Configuration {
  /**
   * Default date selected compare to today
   */
  inXDays: number;
  /**
   * Proposed destinations
   */
  destinations: DestinationConfiguration[];
  /**
   * Propose round trip
   */
  shouldProposeRoundTrip: boolean;
}

export const CONFIGURATION_PRES_DEFAULT_CONFIG: ConfigurationPresConfig = {
  inXDays: 7,
  destinations: [
    { cityName: 'London', available: true },
    { cityName: 'Paris', available: true },
    { cityName: 'New-York', available: false }
  ],
  shouldProposeRoundTrip: false
};

export const CONFIGURATION_PRES_CONFIG_ID = computeConfigurationName('ConfigurationPresConfig', 'showcase');
