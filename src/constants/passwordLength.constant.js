export const MIN = 0;
export const MAX = 20;

export const CHAR_POOLS = {
    1: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    2: "abcdefghijklmnopqrstuvwxyz",
    3: "0123456789",
    4: "!@#$%^&*()_+-=[]{}|;:,.<>?"
}

export const STRENGTH_LEVELS = [
    {
        label: "TOO WEAK!",
        level: 1,
        color: "bg-red-500 border-red-500",
    },
    {
        label: "WEAK",
        level: 2,
        color: "bg-orange-400 border-orange-400"
    },
    {
        label: "MEDIUM",
        level: 3,
        color: "bg-yellow-300 border-yellow-300"
    },
    {
        label: "STRONG",
        level: 4,
        color: "bg-green-200 border-green-200"
    }
]
