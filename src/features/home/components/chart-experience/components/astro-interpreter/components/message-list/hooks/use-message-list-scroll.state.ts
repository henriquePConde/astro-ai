'use client';

import { useRef, useEffect, useCallback } from 'react';
import { DATA_SECTION_TABS } from '@/features/home/components/chart-experience/components/data-section/data-section.constants';
import type { DataSectionTab } from '@/features/home/components/chart-experience/components/data-section/data-section.types';
import type { ChatMessage } from '../message-list.types';

/**
 * UI state hook for message list auto-scrolling behavior.
 * Component-level hook for local UI state only (no I/O).
 * Handles:
 * - Auto-scrolling to bottom when messages change
 * - Detecting user manual scroll to pause auto-scroll
 * - Scrolling to bottom when tab is activated
 */
export function useMessageListScroll(
  scrollContainerRef: React.RefObject<HTMLDivElement | null>,
  messages: ChatMessage[],
  isLoading: boolean,
  activeTab?: DataSectionTab,
) {
  const isInitialMountRef = useRef(true);
  const lastActiveTabRef = useRef<typeof activeTab>(undefined);
  const isProgrammaticScrollRef = useRef(false);
  const userScrolledAwayRef = useRef(false);
  const scrollableElementRef = useRef<HTMLElement | null>(null);

  // Find the scrollable element (container or parent)
  const findScrollableElement = useCallback(() => {
    if (!scrollContainerRef.current) return null;

    const container = scrollContainerRef.current;

    // Check if this element is scrollable
    const containerStyle = getComputedStyle(container);
    const isContainerScrollable =
      container.scrollHeight > container.clientHeight &&
      (containerStyle.overflowY === 'auto' || containerStyle.overflowY === 'scroll');

    if (isContainerScrollable) {
      return container;
    }

    // If not scrollable, find the scrollable parent
    let parent = container.parentElement;
    while (parent && parent !== document.body) {
      const parentStyle = getComputedStyle(parent);
      const parentIsScrollable =
        parent.scrollHeight > parent.clientHeight &&
        (parentStyle.overflowY === 'auto' || parentStyle.overflowY === 'scroll');

      if (parentIsScrollable) {
        return parent;
      }
      parent = parent.parentElement;
    }

    return null;
  }, [scrollContainerRef]);

  // Check if user is near the bottom (within threshold)
  const isNearBottom = useCallback((element: HTMLElement, threshold = 100): boolean => {
    const { scrollTop, scrollHeight, clientHeight } = element;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    return distanceFromBottom <= threshold;
  }, []);

  const scrollToBottom = useCallback(
    (immediate = false, force = false) => {
      // Don't auto-scroll if user has scrolled away (unless forced)
      if (!force && userScrolledAwayRef.current) {
        return;
      }

      const scrollableElement = findScrollableElement();
      if (!scrollableElement) return;

      // Store reference for scroll event handler
      scrollableElementRef.current = scrollableElement;

      // Ensure element is visible (not display: none)
      const style = getComputedStyle(scrollableElement);
      if (style.display === 'none') {
        return; // Can't scroll hidden elements
      }

      // Mark as programmatic scroll
      isProgrammaticScrollRef.current = true;

      // Use scrollTop directly for more reliable scrolling to absolute bottom
      // Force a reflow to ensure scrollHeight is accurate
      void scrollableElement.offsetHeight;

      scrollableElement.scrollTop = scrollableElement.scrollHeight;

      // Also use scrollTo as fallback for smooth behavior when needed
      if (!immediate) {
        scrollableElement.scrollTo({
          top: scrollableElement.scrollHeight,
          behavior: 'smooth',
        });
      }

      // Reset programmatic flag after a short delay
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
        // After programmatic scroll, check if we're at bottom and reset userScrolledAway
        if (isNearBottom(scrollableElement, 50)) {
          userScrolledAwayRef.current = false;
        }
      }, 100);
    },
    [findScrollableElement, isNearBottom],
  );

  // Handle user scroll events to detect manual scrolling
  useEffect(() => {
    const scrollableElement = findScrollableElement();
    if (!scrollableElement) return;

    const handleScroll = () => {
      // Ignore programmatic scrolls
      if (isProgrammaticScrollRef.current) {
        return;
      }

      // Check if user scrolled away from bottom
      if (isNearBottom(scrollableElement, 100)) {
        // User is near bottom, allow auto-scrolling
        userScrolledAwayRef.current = false;
      } else {
        // User scrolled away from bottom, disable auto-scrolling
        userScrolledAwayRef.current = true;
      }
    };

    // Use a small delay to ensure element is ready
    const timeoutId = setTimeout(() => {
      scrollableElement.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      scrollableElement.removeEventListener('scroll', handleScroll);
    };
  }, [findScrollableElement, isNearBottom, messages.length]);

  // Scroll when messages change (user sends message or AI replies) or when loading state changes
  useEffect(() => {
    // Check if the last message is from the user
    const lastMessage = messages[messages.length - 1];
    const isUserMessage = lastMessage?.role === 'user';

    // Always scroll when user sends a message (user intent to see their message)
    // Only auto-scroll for AI replies if user is at bottom
    if (isUserMessage) {
      // User sent a message, reset scroll state and always scroll
      userScrolledAwayRef.current = false;
      scrollToBottom(false, true); // Force scroll for user messages
    } else if (!userScrolledAwayRef.current) {
      // AI replied and user is at bottom, auto-scroll
      scrollToBottom();
    }
    // If user scrolled away and AI replied, don't auto-scroll
  }, [messages, isLoading, scrollToBottom]);

  // Scroll when tab switches to AI (with multiple attempts to ensure DOM is ready)
  useEffect(() => {
    const wasTabJustActivated =
      activeTab === DATA_SECTION_TABS.AI && lastActiveTabRef.current !== DATA_SECTION_TABS.AI;

    if (wasTabJustActivated) {
      // Reset user scroll state when tab is activated (user wants to see latest)
      userScrolledAwayRef.current = false;

      let timeoutId1: NodeJS.Timeout | null = null;
      let timeoutId2: NodeJS.Timeout | null = null;
      let timeoutId3: NodeJS.Timeout | null = null;
      let frameId2: number | null = null;
      let frameId3: number | null = null;

      // Use multiple requestAnimationFrame calls to ensure layout is complete
      const frameId1 = requestAnimationFrame(() => {
        // First attempt - immediate scroll to get positioned quickly (force = true for tab switch)
        scrollToBottom(true, true);

        // Second frame to catch any layout updates - use smooth scroll
        frameId2 = requestAnimationFrame(() => {
          scrollToBottom(false, true); // Smooth scroll, force = true

          // Third frame for additional layout passes - smooth scroll
          frameId3 = requestAnimationFrame(() => {
            scrollToBottom(false, true); // Smooth scroll, force = true
          });
        });

        // Smooth scroll after a short delay to ensure layout is stable
        timeoutId1 = setTimeout(() => {
          scrollToBottom(false, true); // Smooth scroll, force = true
        }, 150);

        // Final smooth scroll after medium delay as fallback
        timeoutId2 = setTimeout(() => {
          scrollToBottom(false, true); // Smooth scroll, force = true
        }, 300);

        // Last attempt with smooth scroll
        timeoutId3 = setTimeout(() => {
          scrollToBottom(false, true); // Smooth scroll, force = true
        }, 500);
      });

      return () => {
        cancelAnimationFrame(frameId1);
        if (frameId2 !== null) cancelAnimationFrame(frameId2);
        if (frameId3 !== null) cancelAnimationFrame(frameId3);
        if (timeoutId1) clearTimeout(timeoutId1);
        if (timeoutId2) clearTimeout(timeoutId2);
        if (timeoutId3) clearTimeout(timeoutId3);
      };
    }

    lastActiveTabRef.current = activeTab;
  }, [activeTab, scrollToBottom]);

  // Initial scroll when component mounts with messages and tab is active
  useEffect(() => {
    if (isInitialMountRef.current && messages.length > 0 && activeTab === DATA_SECTION_TABS.AI) {
      isInitialMountRef.current = false;
      let timeoutId1: NodeJS.Timeout | null = null;
      let timeoutId2: NodeJS.Timeout | null = null;
      let frameId2: number | null = null;

      // Reset user scroll state on initial mount (user wants to see latest)
      userScrolledAwayRef.current = false;

      // Use multiple requestAnimationFrame calls to ensure DOM is ready
      const frameId1 = requestAnimationFrame(() => {
        // First immediate scroll to position quickly (force = true for initial mount)
        scrollToBottom(true, true);

        // Second frame to catch layout updates - use smooth scroll
        frameId2 = requestAnimationFrame(() => {
          scrollToBottom(false, true); // Smooth scroll, force = true
        });

        // Also try after delays as fallback with smooth scroll
        timeoutId1 = setTimeout(() => {
          scrollToBottom(false, true); // Smooth scroll, force = true
        }, 150);

        timeoutId2 = setTimeout(() => {
          scrollToBottom(false, true); // Smooth scroll, force = true
        }, 300);
      });

      return () => {
        cancelAnimationFrame(frameId1);
        if (frameId2 !== null) cancelAnimationFrame(frameId2);
        if (timeoutId1) clearTimeout(timeoutId1);
        if (timeoutId2) clearTimeout(timeoutId2);
      };
    }
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
    }
  }, [messages.length, activeTab, scrollToBottom]);
}
