export interface IShare {
  name: string;
  email: string;
  title: string;
}

// Interface for when server emits events to clients.
export interface ServerToClientEvents {
  share: (e: IShare) => void;
}

// Interface for when clients emit events to the server.
export interface ClientToServerEvents {
  share: (e: IShare) => void;
}
