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
    cost: number;
    packages: string[];
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


export interface RoutePoint {
    start: {
        address: string;
        latitude: number;
        longitude: number;
    };
    end: {
        address: string;
        latitude: number;
        longitude: number;
    };
    distance: string;
    duration: string;
}

export interface AssignmentData {
    assigned_time: string;
    assignment_cost: {
        cost: string;
        total_weight: string | null;
        total_distance: string;
        cost_criteria_considered: string;
    };
    assignment_status: string;
    ca_id: number;
    cas_ID: string;
    confirmed_time: string;
    confirmed_to: string;
    device_ID: string;
    dock_allocated: string | null;
    dock_allocation_status: string;
    dock_time_requested: string | null;
    driver_data: {
        c_driver_name: string;
        c_driver_number: string;
        c_driver_license: string;
    };
    order_ID: string;
    req_sent_to: string[];
    vehicle_num: string;
}

export interface Product {
    prod_ID: string;
    quantity: number;
    package_info: string;
}

interface AdditionalInfo {
    invoice: string;
    po_number: string;
    attachment: string | null;
    department: string;
    reference_id: string;
    sales_order_number: string;


}

interface TaxInfo {
    tax_rate: string;
    sender_gst: string;
    carrier_gst: string;
    receiver_gst: string;
    self_transport: string;
}

export interface PackageDetails {
    pac_id: number;
    pack_ID: string;
    ship_from: string;
    ship_to: string;
    destination_radius: number | null;
    dropoff_date_time: string;
    pickup_date_time: string;
    package_info: string;
    package_status: string;
    return_label: number;
    product_ID: Product[];
    bill_to: string;
    tax_info: TaxInfo;
    additional_info: AdditionalInfo;
}


export interface AllocationsProps {
    allocations: Allocation[];
    orderId: string;
    allocatedPackageDetails: PackageDetails[];
    from: string;
    assignmentData: AssignmentData;
}

export interface AdditionalInformation {
    reference_id: string;
    invoice: string;
    department: string;
    sales_order_number: string;
    po_number: string;
    attachment: string;
}

export interface TaxInformation {
    sender_gst: string;
    receiver_gst: string;
    carrier_gst: string;
    self_transport: string;
    tax_rate: string;
}
export interface PackageDetail {
    pac_id: string;
    pack_ID: string;
    package_status: string;
    ship_from: string;
    ship_to: string;
    pickup_date_time: string;
    dropoff_date_time: string;
    return_label: boolean;
    product_ID: Product[];
    bill_to: string;
    additional_info: AdditionalInformation;
    tax_info: TaxInformation;
}
export interface ProductDetails {
    product_ID: string;
    product_desc: string;
    product_name: string;
    weight: string;
}

export interface Location {
    loc_ID: string;
}