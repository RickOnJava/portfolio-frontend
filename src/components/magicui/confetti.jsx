"use client";
import confetti from "canvas-confetti";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { Button } from "@/components/ui/button";
import MagicButton from "../ui/MagicButton";
import { IoCopyOutline } from "react-icons/io5";

const ConfettiContext = createContext({});

// Define component first
const ConfettiComponent = forwardRef((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    ...rest
  } = props;
  const instanceRef = useRef(null);

  const canvasRef = useCallback(
    (node) => {
      if (node !== null) {
        if (instanceRef.current) return;
        instanceRef.current = confetti.create(node, {
          ...globalOptions,
          resize: true,
        });
      } else {
        if (instanceRef.current) {
          instanceRef.current.reset();
          instanceRef.current = null;
        }
      }
    },
    [globalOptions]
  );

  const fire = useCallback(
    async (opts = {}) => {
      try {
        await instanceRef.current?.({ ...options, ...opts });
      } catch (error) {
        console.error("Confetti error:", error);
      }
    },
    [options]
  );

  const api = useMemo(
    () => ({
      fire,
    }),
    [fire]
  );

  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    if (!manualstart) {
      (async () => {
        try {
          await fire();
        } catch (error) {
          console.error("Confetti effect error:", error);
        }
      })();
    }
  }, [manualstart, fire]);

  return (
    <ConfettiContext.Provider value={api}>
      <canvas ref={canvasRef} {...rest} />
      {children}
    </ConfettiContext.Provider>
  );
});

// Set display name immediately
ConfettiComponent.displayName = "Confetti";

// Export as Confetti
export const Confetti = ConfettiComponent;

const ConfettiButtonComponent = ({
  options,
  copied,
  setCopied,
}) => {
  const handleClick = async (event) => {
    try {
      setCopied(true);
      navigator.clipboard.writeText("rickghosh824@gmail.com");

      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      await confetti({
        ...options,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
      });
    } catch (error) {
      console.error("Confetti button error:", error);
    } finally {
      setTimeout(() => setCopied(false), 1000);
    }
  };

  return (
    // <Button onClick={handleClick} classname="bg-pink-400">
    //   {title}
    // </Button>
    <MagicButton
      title={copied ? "Email copied" : "Copy my email"}
      icon={<IoCopyOutline />}
      position="left"
      handleClick={handleClick}
    />
  );
};

ConfettiButtonComponent.displayName = "ConfettiButton";

export const ConfettiButton = ConfettiButtonComponent;
