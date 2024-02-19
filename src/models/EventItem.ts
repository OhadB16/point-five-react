import { Actor } from "./Actor";
import { Payload } from "./Payload";
import { Repository } from "./Repository";

export interface EventItem {
    id: string;
    type: string;
    actor: Actor;
    repo: Repository;
    payload: Payload;
    public: boolean;
    created_at: string;
  }