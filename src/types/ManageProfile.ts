export interface BusinessLocation {
  id: number;
  locationName: string;
  locationAddress: string;
}

export interface BusinessProfileFormValues {
  companyName: string;
  primaryAddress: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  companyLogo: File | null;
  cnpId: string;
  locationName: string;
  locationAddress: string;
  businessVisible: boolean;
  autoAcceptConnections: boolean;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
  locations: BusinessLocation[];
}