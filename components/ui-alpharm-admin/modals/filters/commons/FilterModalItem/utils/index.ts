
export const getStatusHeader = (mode?: "single" | "range" | "month" | "week" | null) => {
    switch (mode) {
        case "single":
            return "дату";
        case "week":
            return "неделю";
        case "range":
            return "промежуток времени";
        default:
            return null;
    }
};
