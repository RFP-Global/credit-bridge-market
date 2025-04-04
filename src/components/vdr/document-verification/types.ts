
export interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  status: "pending" | "uploaded" | "approved" | "rejected";
}
