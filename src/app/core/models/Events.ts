export interface Event {
    id_event: number;
    name: string;
    status: string;
    game: string;
    type_game: string;
    description: string;
    date: string;
    amount: number;
    id_personal: number;
  }
  
  export interface EventWithParticipantCount {
    event: Event;
    participantCount: number;
  }
  