import { textData } from "../constants/text";

/**
 * Based on the hours, return text for greetings
 * Mentioned tye for Greeting Text
 * @returns Greetings as text 
 */
  export function getGreeting(): string{
    const hour = new Date().getHours();
    if(hour < 12) return textData.morning;
    if(hour < 16) return textData.afternoon;
    return textData.evening;
  }
