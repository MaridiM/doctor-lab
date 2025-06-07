import { differenceInYears, format } from "date-fns";

export function calculateAge(dob: string) {
    // Преобразуем строку даты рождения в объект Date
    const birthDate = new Date(dob);
    
    // Текущая дата
    const currentDate = new Date();
    
    // Вычисление возраста
    const age = differenceInYears(currentDate, birthDate);

    // Форматирование текущей даты
    const formattedDate = format(currentDate, 'yyyy-MM-dd');

    return { age, formattedDate };
}