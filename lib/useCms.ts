'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { defaultContent, SiteContent } from '@/lib/content';

export function useCms() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const docRef = doc(db, 'settings', 'siteContent');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setContent(snap.data() as SiteContent);
        } else {
          await setDoc(docRef, defaultContent);
          setContent(defaultContent);
        }
      } catch (error) {
        console.error("Failed to fetch CMS content:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const saveContent = async (newContent: SiteContent) => {
    setSaving(true);
    try {
      const docRef = doc(db, 'settings', 'siteContent');
      await setDoc(docRef, newContent);
      setContent(newContent);
      alert('Content saved successfully!');
    } catch (error) {
      console.error("Failed to save CMS content:", error);
      alert('Failed to save content. Check permissions.');
    } finally {
      setSaving(false);
    }
  };

  return { content, loading, saving, saveContent, setContent };
}
