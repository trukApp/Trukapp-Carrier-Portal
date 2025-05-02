export interface IAuthState {
    authState: boolean;
    carrierId: string | null;
    orderID: string | null;
}


export interface LoginValues {
    carrierId: string;
    password: string;
}

export interface CarrierAssignment {
    ca_id: number;
    cas_ID: string;
    order_ID: string;
    assignment_status: string;
    assigned_time: string;
    confirmed_time?: string;
    driver_data?: {
        c_driver_name?: string;
        c_driver_number?: string;
        c_driver_license?: string;
    };
    vehicle_num?: string;
    assignment_cost?: {
        total_distance?: string;
        cost_criteria_considered?: string;
    };
    confirmed_to?: string;
}


interface Route {
    start: { address: string; latitude: number; longitude: number };
    end: { address: string; latitude: number; longitude: number };
    distance: string;
    duration: string;
}

interface Allocation {
    vehicle_ID: string;
    route: Route[];
    leftoverVolume: number;
    leftoverWeight: number;
    occupiedVolume: number;
    occupiedWeight: number;
    totalVolumeCapacity: number;
    totalWeightCapacity: number;
}

export interface Order {
    updated_at: string;
    created_at: string;
    unallocated_packages: string[];
    ord_id: number;
    order_ID: string;
    scenario_label: string;
    total_cost: string;
    allocations: Allocation[];
    order_status: string
}

export interface CarrierBidOrder {
    bid_id: number;
    order_ID: string;
    bid_value: string;
    bid_timing: string;
    bid_start_time: string;
    bid_end_time: string | null;
    scenario_label: string;
    total_weight: string;
    total_distance: string;
    allocated_vehicles: string[];
    allocated_packages: string[];
    order_status: string;
}

export interface CarrierBidData {
    bid_from: string,
    bid_amount: string,
    bid_placed_at: string
}
