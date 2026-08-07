
export interface CarrierAssignmentData {
  ca_id: number;
  cas_ID: string;
  order_ID: string;

  req_sent_to: string[];
  confirmed_to: string;

  assigned_pro_number: string | null;
  assigned_time: string | null;

  assignment_cost: {
    cost: string;
    total_weight: string | null;
    total_distance: string | null;
    cost_criteria_considered: string;
  } | null;

  assignment_status: string | null;

  carrier_bill: unknown[] | null;

  confirmed_time: string | null;

  device_ID: string | null;

  dock_allocated: string | null;
  dock_allocation_status: string | null;
  dock_time_requested: string | null;

  driver_data: {
    c_driver_license: string;
    c_driver_name: string;
    c_driver_number: string;
  } | null;

  vehicle_num: string | null;
}
// export interface BidHeaderProps {
//   order: Order;
//   bidAmount?: string;
//   remainingTime?: string;
//   existingBid?: {
//     bid_amount: string;
//     bid_placed_at: string;
//     bid_from: string;
//   } | null;
//   lowestBid?: number | null;
//   onPlaceBid?: () => void;
//   onAccept?: () => void;
//   onReject?: () => void;
//   bidStatus?: string;
//   carrierID?: string;
//   isBidFinalised?: boolean;
// isFinalisedForCurrentCarrier?: boolean;
// finalisedBid?: {
//   finalised_bid: string;
//   finalised_for: string;
//   CarrierAssignmentData ?: CarrierAssignmentData | null;
// };
// }
export interface BidHeaderProps {
  order: Order;
  bidAmount?: string;
  remainingTime?: string;

  existingBid?: {
    bid_amount: string;
    bid_placed_at: string;
    bid_from: string;
  } | null;
  lowestBid?: number | null;
  onPlaceBid?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  bidStatus?: string;
  carrierID: string;

  isBidFinalised?: boolean;

  isFinalisedForCurrentCarrier?: boolean;

  finalisedBid?: {
    finalised_bid: string;
    finalised_for: string;
  };

  carrierAssignmentData?: CarrierAssignmentData | null;
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
  packageDetails: string[];
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
  package_dest_radius: number | string;
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
