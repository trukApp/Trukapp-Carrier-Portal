export interface IAuthState {
    authState: boolean;
    carrierId: string | null;
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
