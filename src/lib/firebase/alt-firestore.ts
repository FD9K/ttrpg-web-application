
import { auth, firestore } from "./config";
import type fb from "firebase";
import firebase from "firebase";
import type { UserInformation, Character, Campaign, Invite } from "../../global";
import { v4 } from "uuid";
const { currentUser } = auth;

type Query = {
  field: string;
  operator: fb.firestore.WhereFilterOp;
  value: string;
};

type OrderBy = {
  field: string;
  direction: fb.firestore.OrderByDirection;
}

type UpdateFields = {
  [property: string]: any;
}

type DatabaseOptions = {
  collection: string;
  id?: string;
  queries?: Query[];
  orderBy?: OrderBy;
  updateData?: UpdateFields;
  updateArrayData?: {
    field: string;
    value: any;
    operation: string;
  }
  writeData?: UserInformation[] | Character[] | Campaign[] | Invite[];
}

export async function readMany(options: DatabaseOptions): Promise<Object[]> {
  const { collection, queries, orderBy } = options;
  let collectionReference:any = firestore.collection(collection);

  if (queries) {
    queries.forEach((query) => {
      const { field, operator, value } = query;
      collectionReference = collectionReference.where(field, operator, value);
    });
  }
  
  if (orderBy) {
    const { field, direction } = orderBy;
    collectionReference = collectionReference.orderBy(field, direction);
  }

  try {
    const records = [];
    const response = await collectionReference.get();
    response.forEach((document) => {
      records.push(document.data());
    });
    return records;
  } catch (error) {
    return error;
  }
}

export async function readOne(options: DatabaseOptions): Promise<Object> {
  const { collection, id } = options;
  try {
    const response = await firestore.collection(collection)
      .doc(id)
      .get();
    
    if (response.exists) {
      return response.data();
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
}

export async function write(options: DatabaseOptions): Promise<void> {
  const { collection, writeData } = options;
  const batch = firestore.batch();
  writeData.forEach((datum) => {
    // set a uuid for the record.
    const uuid = v4();
    datum.id = uuid;
    const documentReference = firestore.collection(collection).doc(uuid);
    batch.set(documentReference, datum);
  });
  try {
    await batch.commit();
  } catch (error) {
    return error;
  }
}

export async function updateMany(options: DatabaseOptions) {
  const { collection, queries, updateData } = options;
  const collectionReference = firestore.collection(collection);

  // step 1: use the queries to find relevant documents.
  queries.forEach((query) => {
    const { field, operator, value } = query;
    collectionReference.where(field, operator, value);
  });

  const documentIds: string[] = [];
  try {
    const response = await collectionReference.get();
    response.forEach((document) => {
      documentIds.push(document.id);
    });
  } catch (error) {
    return error;
  }

  // step two: modify any docs returned by the query with the update data.
  const batch = firestore.batch();
  documentIds.forEach((documentId) => {
    const documentReference = firestore.collection(collection)
      .doc(documentId);
    batch.update(documentReference, updateData);
  });

  try {
    await batch.commit();
  } catch (error) {
    return error;
  }
}

export async function updateOne(options: DatabaseOptions): Promise<void> {
  const { id, collection, updateData } = options;
  try {
    await firestore.collection(collection)
      .doc(id)
      .update(updateData);
  } catch (error) {
    return error;
  }
}

export async function deleteOne(options: DatabaseOptions) {
  const { id, collection } = options;
  try {
    await firestore.collection(collection)
      .doc(id)
      .delete();
  } catch (error) {
    return error;
  }
}

// a lot of our relational stuff requires this kind of operation.
export async function updateArray(options: DatabaseOptions) {
  const { id, collection, updateArrayData } = options;
  try {
    const { field, value, operation } = updateArrayData;
    if (operation === "push") {
      await firestore.collection(collection)
        .doc(id)
        .update({
          [field]: firebase.firestore.FieldValue.arrayUnion(value)
        });
    } else if (operation === "del") {
      await firestore.collection(collection)
        .doc(id)
        .update({
          [field]: firebase.firestore.FieldValue.arrayRemove(value)
        });
    }
  } catch (error) {
    return error;
  }
}