export interface AssignmentCost {
  cost: string;
  cost_criteria_considered: string;
  total_distance: string;
  total_weight: string | null;
}

export interface PackageDestinationRadius {
  pack_ID: string;
  ship_to: string;
  destination_radius: number;
}

export interface RoutePoint {
  sequence?: number;
  start_loc_ID?: string;
  end_loc_ID?: string;
  distance?: string | number;
  duration?: string;
}

export interface AllocationSummary {
  vehicle_ID: string;
  occupiedWeight: number;
  occupiedVolume: number;
  occupiedPercent: number;
  totalWeightCapacity: number;
  totalVolumeCapacity: number;
  chargeableWeight: number;
  leftoverWeight: number;
  leftoverVolume: number;
  packages: string[];
  packageDetails: unknown[];
  packageInfoDetails: unknown[];
  sampledRoutePoints: unknown[];
  route: RoutePoint[];
  loadArrangement: unknown[];
  trafficSummary: unknown | null;
  cost: number;
}

export interface CarrierAssignment {
  ca_id: number;
  cas_ID: string;
  ord_id: number;
  order_ID: string;
  assignment_status: string;
  assigned_time: string;
  confirmed_time: string | null;
  confirmed_to: string;
  assigned_pro_number: string;
  bill_of_lading: string | null;
  dock_allocation_status: string;
  dock_allocated: string | null;
  dock_time_requested: string | null;
  draft: number;
  order_status: string;
  scenario_label: string;
  start_loc_ID: string;
  end_loc_ID: string;
  vehicle_num: string | null;
  total_cost: string;
  total_distance: string;
  total_weight: string;
  assignment_cost: AssignmentCost;
  allocated_packages: string[];
  allocated_vehicles: string[];
  unallocated_packages: string[];
  package_dest_radius: PackageDestinationRadius[];
  req_sent_to: string[];
  order_docs: unknown[];
  carrier_bill: unknown[];
  driver_data: unknown | null;
  allocations: AllocationSummary[];
  created_at: string;
  updated_at: string;
}

export interface AssignmentFilterState {
  freightOrder: string;
  orderingParty: string;
  departureLocation: string;
  assignmentStatus: string;
  departureDate: Date | null;
}

// export type AssignmentTab =
//   | "all"
//   | "pending"
//   | "confirmed"
//   | "rejected"
//   |"completed";

export type AssignmentTab =
  | "all"
  | "pending"
  | "carrier confirmed"
  | "carrier rejected"
  | "completed";