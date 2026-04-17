
'use client';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, Firestore, writeBatch } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export type UserProfile = {
  id: string;
  email: string | null;
  displayName: string | null;
  createdAt: any;
  surveyCompleted: boolean;
  websiteUrl?: string;
  twitterHandle?: string;
  instagramHandle?: string;
  linkedinHandle?: string;
  yearlySalesGoal?: number;
  yearlyEngagementGoal?: number;
};

export type SurveyAnswers = {
  [key: string]: string;
};

export type UserSettings = {
    websiteUrl?: string;
    twitterHandle?: string;
    instagramHandle?: string;
    linkedinHandle?: string;
    yearlySalesGoal?: number;
    yearlyEngagementGoal?: number;
}

/**
 * Creates a user profile document in Firestore if it doesn't already exist.
 * This is typically called after a user signs up.
 * Returns a promise that resolves when the operation is complete.
 */
export async function createUserProfileDocument(
  firestore: Firestore,
  user: User,
  displayName: string
): Promise<void> {
  const userRef = doc(firestore, `users/${user.uid}`);

  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) {
    const { uid, email } = user;
    const createdAt = serverTimestamp();
    const profile: UserProfile = {
      id: uid,
      email,
      displayName,
      createdAt,
      surveyCompleted: false,
    };

    try {
      await setDoc(userRef, profile, { merge: true });
    } catch (serverError) {
      const permissionError = new FirestorePermissionError({
        path: userRef.path,
        operation: 'create',
        requestResourceData: profile,
      });
      errorEmitter.emit('permission-error', permissionError);
      throw permissionError;
    }
  }
}


/**
 * Saves the user's survey answers and updates the user profile atomically.
 */
export async function saveSurveyAnswers(
  firestore: Firestore,
  userId: string,
  answers: SurveyAnswers
): Promise<void> {
  const surveyRef = doc(firestore, `users/${userId}/surveys/initial`);
  const userRef = doc(firestore, `users/${userId}`);

  const surveyData = { userId, ...answers, submittedAt: serverTimestamp() };
  const userProfileUpdate = { surveyCompleted: true };
  
  const batch = writeBatch(firestore);

  batch.set(surveyRef, surveyData);
  batch.update(userRef, userProfileUpdate);

  try {
    await batch.commit();
  } catch (serverError) {
    const permissionError = new FirestorePermissionError({
        path: surveyRef.path,
        operation: 'write',
        requestResourceData: { survey: surveyData, profileUpdate: userProfileUpdate },
      });
    errorEmitter.emit('permission-error', permissionError);
    throw permissionError;
  }
}


/**
 * Saves user settings to their profile document.
 */
export async function saveUserSettings(
  firestore: Firestore,
  userId: string,
  settings: UserSettings
): Promise<void> {
    const userRef = doc(firestore, `users/${userId}`);
    try {
        await updateDoc(userRef, settings);
    } catch (serverError) {
        const permissionError = new FirestorePermissionError({
            path: userRef.path,
            operation: 'update',
            requestResourceData: settings,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError;
    }
}
