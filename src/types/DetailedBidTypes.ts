// export interface RoutePoint {
//   start: {
//     address: string;
//     latitude: number;
//     longitude: number;
//   };

//   end: {
//     address: string;
//     latitude: number;
//     longitude: number;
//   };

//   distance: string;
//   duration: string;

//   loadAfterStop?: number;
// }

// export interface PackageDetail {
//   pack_ID: string;
//   package_status: string;
//   ship_from: string;
//   ship_to: string;
//   bill_to: string;
//   pickup_date_time: string;
//   dropoff_date_time: string;
//   return_label: boolean;
//   destination_radius?: string;
//   product_lines: ProductLine[];
//   product_ID: ProductLine[];
//   additional_info: AdditionalInformation;
//   tax_info: TaxInformation;
// }

// export interface ProductLine {
//   prod_ID: string;
//   quantity: number;
//   package_info: string;
// }

// export interface AdditionalInformation {
//   reference_id: string;
//   invoice: string;
//   department: string;
//   sales_order_number?: string;
//   po_number: string;
//   attachment: string | null;
// }

// export interface TaxInformation {
//   sender_gst: string;
//   receiver_gst: string;
//   carrier_gst: string;
//   self_transport: string;
//   tax_rate: string;
// }

// export interface TruckCapacity {
//   rawM3: number;
//   usableM3: number;
//   layersUsed: number;
//   oneLayerM3: number;
// }

// export interface VehicleDimensions {
//   interiorWidthM: number;
//   interiorHeightM: number;
//   interiorLengthM: number;
// }

// export interface WeatherSummary {
//   points: number;
//   maxTemp: number;
//   minTemp: number;
//   distinctConditions: string[];
// }

// export interface Allocation {
//   vehicle_ID: string;
//   cost: number;
//   occupiedWeight: number;
//   occupiedVolume: number;
//   leftoverWeight: number;
//   leftoverVolume: number;
//   totalWeightCapacity: number;
//   totalVolumeCapacity: number;
//   truckCapacity: TruckCapacity;
//   vehicleDimensions: VehicleDimensions;
//   weatherSummary?: WeatherSummary;
//   packages: string[];
//   packageDetails: any[];
//   packageInfoDetails: any[];
//   loadArrangement: any[];
//   sampledRoutePoints: any[];
//   route: RoutePoint[];
// }

// export interface Order {
//   order_ID: string;
//   order_status: string;
//   created_at: string;
//   updated_at: string;
//   start_loc_ID: string;
//   end_loc_ID: string;
//   total_distance: string;
//   total_weight: string;
//   total_cost: string;
//   allocated_packages: string[];
//   allocated_vehicles: string[];
//   allocations: Allocation[];
//   scenario_label: string;
//   bill_of_lading: any[];
//   order_docs: any[];
// }

// export interface Vehicle {
//   vehicle_ID: string;
//   veh_id: number;
//   loc_ID: string[];
//   transportation_details: {
//     ownership: string;
//     vehicle_type: string;
//     vehicle_group: string;
//     validity_from: string;
//     validity_to: string;
//   };

//   capacity: {
//     payload_weight: number;
//     cubic_capacity: number;
//     interior_width: string;
//     interior_height: string;
//     interior_length: string;
//   };

//   additional_details: {
//     cost_per_ton: number;
//   };
// }

// export interface LRInvoice {
//   lr_id: number;
//   lr_num: string;
//   order_ID: string;
//   ship_from: string;
//   ship_to: string;
//   packages_in_data: {
//     pack_ID: string;
//     invoice: string;
//     e_way: string | null;
//   }[];
// }

// export interface OrderDetailsResponse {
//   message: string;
//   order: Order;
//   allocated_packages_details: PackageDetail[];
//   allocated_vehicles: Vehicle[];
//   lr_invoices: LRInvoice[];
//   packages_and_weights: {
//     pack_ID: string;
//     package_weight: number;
//     weight_uom: string;
//   }[];
// }

export interface BidHeaderProps {
  order: Order;
  bidAmount?: number | string;
  bidStatus?: string;
  bidClosingTime?: string;
}


export interface RoutePoint {
  location_ID: string;
  location_name: string;
  address: string;

  arrival_time?: string;
  departure_time?: string;

  distance?: string;
  duration?: string;

  status?: string;

  start?: {
    address: string;
    latitude?: number;
    longitude?: number;
  };

  end?: {
    address: string;
    latitude?: number;
    longitude?: number;
  };
}

export interface PackageDetail {
  package_ID: string;

  product_name?: string;

  quantity?: number;

  weight?: number;

  volume?: number;

  pickup_location_name?: string;

  delivery_location_name?: string;

  pickup_contact?: string;

  delivery_contact?: string;

  pickup_time?: string;

  delivery_time?: string;

  status?: string;
}

export interface Vehicle {
  vehicle_ID: string;

  vehicle_number?: string;

  vehicle_type?: string;

  registration_number?: string;

  transporter_name?: string;

  transporter_company?: string;

  transporter_phone?: string;

  transporter_email?: string;

  driver_name?: string;

  driver_phone?: string;

  driver_email?: string;

  fuel_type?: string;

  capacity?: number;

  weight_capacity?: number;

  volume_capacity?: number;
}

export interface Attachment {
  id?: string;

  document_ID?: string;

  file_name?: string;

  name?: string;

  file_type?: string;

  extension?: string;

  file_size?: string;

  uploaded_by?: string;

  uploaded_on?: string;

  created_by?: string;

  created_at?: string;

  file_url?: string;

  url?: string;
}

export interface Allocation {
  vehicle_ID: string;
  cost: number;
  totalVolumeCapacity: number;
  totalWeightCapacity: number;
  occupiedVolume: number;
  occupiedWeight: number;
  leftoverVolume: number;
  leftoverWeight: number;
  packages: string[];
  route: RoutePoint[];
  packageDetails:string[];
}

export interface Order {
  order_ID: string;
  order_status?: string;
  bid_status?: string;
  scenario_label?: string;
  shipment_type?: string;
  total_distance?: string;
  total_weight?: string;
  total_volume?: string;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  ordering_party_name?: string;
  ordering_party_company?: string;
  ordering_party_phone?: string;
  ordering_party_email?: string;
  customer_name?: string;
  company_name?: string;
  consignee_name?: string;
  consignee_company?: string;
  consignee_phone?: string;
  consignee_email?: string;
  phone?: string;
  email?: string;
  allocations: Allocation[];
  attachments?: Attachment[];
  documents?: Attachment[];
  start_loc_ID: string;
}
export interface ProductLine {
  prod_ID: string;
  quantity: number;
  package_info: string;
}

export interface ProductDetails {
  product_ID: string;
  product_desc: string;
  product_name: string;
  weight: string;
}
export interface Product {
  prod_ID: string;
  quantity: number;
  package_info: string;
}

interface AdditionalInformation {
  reference_id: string;
  invoice: string;
  department: string;
  sales_order_number: string;
  po_number: string;
  attachment: string;
}

interface TaxInformation {
  sender_gst: string;
  receiver_gst: string;
  carrier_gst: string;
  self_transport: string;
  tax_rate: string;
}

export interface PackageDetail {
  product_lines: ProductLine[];
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

export interface Location {
  location_id: number;
  loc_ID: string;
  loc_desc: string;
  loc_type: string;
  gln_code: string;
  iata_code: string;
  longitude: string;
  latitude: string;
  time_zone: string;
  address_1: string;
  address_2: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
  contact_name: string;
  contact_phone_number: string;
  contact_email: string;
  def_ship_from: number | boolean;
  def_bill_to: number | boolean;
  locationId: string;
  gst: string;
  def_ship_to: number | boolean;
  gst_number: string;
}

