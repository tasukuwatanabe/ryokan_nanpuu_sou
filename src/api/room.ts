import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";

import { db } from "@/firebase/firebase";
import { Room, Reservation } from "@/types";

export const getRooms = async () => {
  const roomsCol = collection(db, "rooms");
  const roomSnapshot = await getDocs(roomsCol);
  const roomList = roomSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Room;
  });

  return roomList;
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
