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
    package_dest_radius: PackageDestRadius[]
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

// export interface Order {
//     updated_at: string;
//     created_at: string;
//     unallocated_packages: string[];
//     ord_id: number;
//     order_ID: string;
//     scenario_label: string;
//     total_cost: string;
//     allocations: Allocation[];
//     order_status: string
// }
export interface Order {
  bid_id: number;
  ord_id: number;

  order_ID: string;
  order_status: string;

  bid_value: string;
  bid_status: string;
  bid_start_time: string;
  bid_closing_time: string;
  bid_end_time: string;

  scenario_label: string;

  start_loc_ID: string;
  end_loc_ID: string;

  total_cost: string;
  total_distance: string;
  total_weight: string;

  allocated_packages: string[];
  allocated_vehicles: string[];
  unallocated_packages: string[];

  allocations: Allocation[];

  bid_reqs: string[];

  finalised_bid?: {
    finalised_bid: string;
    finalised_for: string;
  } | null;

  all_bids?: {
    bid_amount: string;
    bid_from: string;
    bid_placed_at: string;
  }[];

  assignment_status?: string | null;
  assignment_cost?: {
    cost: string;
    total_weight: string | null;
    total_distance: string | null;
    cost_criteria_considered: string;
  } | null;

  assigned_pro_number?: string | null;
  assigned_time?: string | null;
  confirmed_time?: string | null;

  bill_of_lading?: unknown[] | null;
  carrier_bill?: unknown[] | null;

  draft: number;

  package_dest_radius: unknown[] | null;

  order_docs: unknown[];

  driver_data?: {
    c_driver_name: string;
    c_driver_number: string;
    c_driver_license: string;
  } | null;

  vehicle_num?: string | null;
  device_ID?: string | null;

  dock_allocated?: string | null;
  dock_allocation_status?: string | null;
  dock_time_requested?: string | null;

  created_at: string;
  updated_at: string;
}
interface PackageDestRadius {
    pack_ID: string;
    ship_to: string;
    destination_radius: string;
}

export interface CarrierBidOrder {
    all_bids: boolean;
    package_dest_radius: PackageDestRadius[];
    start_loc_ID: string;
    end_loc_ID: string;
    bid_id: number;
    order_ID: string;
    bid_value: string;
    bid_timing: string;
    bid_start_time: string;
    bid_end_time: string | null;
    bid_closing_time: string;
    scenario_label: string;
    total_weight: string;
    total_distance: string;
    allocated_vehicles: string[];
    allocated_packages: string[];
    order_status: string;
    bid_status: string;
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

interface ProductLine {
    prod_ID: string;
    quantity: number;
    package_info: string;
}

export interface PackageDetails {
    product_lines: ProductLine[];
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