export type ConfirmedOrderTab =
  | "assignments"
  | "finalised-bids";

export interface AssignmentFilterState {
  freightOrder: string;
  orderingParty: string;
  departureLocation: string;
  assignmentStatus: string;
  departureDate: Date | null;
}