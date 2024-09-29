import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";

import { db } from "@/firebase/firebase";
import { Room, Reservation } from "@/types";

export const getRooms = async () => {
  const roomsCol = collection(db, "rooms");
  const roomSnapshot = await getDocs(roomsCol);

  return roomSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Room
  );
};

export const getRoomById = async (
  roomId: string
): Promise<Room | undefined> => {
  const docRef = doc(db, "rooms", roomId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.data()) return;

  return {
    id: roomId,
    ...docSnap.data(),
  } as Room;
};

export const getReservations = async () => {
  const reservationsCol = collection(db, "reservations");
  const reservationSnapshot = await getDocs(reservationsCol);

  return reservationSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Reservation
  );
};
