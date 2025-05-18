import { QueryCompositeFilterConstraint, collection, query } from 'firebase/firestore';
import { useSlice } from '../store/store';
import { useCollectionData, useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { CollectionName, TableTypes, converters } from 'core';
import { firestore } from '../firebase';

type Props<T = CollectionName> = {
  collectionName: T;
  filter?: QueryCompositeFilterConstraint;
};

export const useUserCollection = <T extends CollectionName>({
  collectionName,
  filter,
}: Props<T>): [TableTypes[T][] | undefined, boolean, Error | undefined] => {
  const { uid } = useSlice.use.authentication();

  const collectionRef = collection(firestore, CollectionName.User, uid ?? '', collectionName);

  const [data, loading, error] = useCollectionData<TableTypes[T]>(
    (filter ? query(collectionRef, filter) : collectionRef).withConverter(converters[collectionName]),
    {}
  );

  return [data, loading, error];
};

export const useUserCollectionOnce = <T extends CollectionName>({
  collectionName,
  filter,
}: Props<T>): [TableTypes[T][] | undefined, boolean, Error | undefined, () => Promise<void>] => {
  const { uid } = useSlice.use.authentication();

  const collectionRef = collection(firestore, CollectionName.User, uid ?? '', collectionName);

  const [data, loading, error, , reload] = useCollectionDataOnce<TableTypes[T]>(
    (filter ? query(collectionRef, filter) : collectionRef).withConverter(converters[collectionName]),
    {}
  );

  return [data, loading, error, reload];
};
