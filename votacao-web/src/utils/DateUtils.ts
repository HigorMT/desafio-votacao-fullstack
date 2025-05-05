export class DateUtils {

    public static readonly formatarTempo = (totalSegundos?: number | null): string => {
        if (!totalSegundos) {
            return '00:00:00'
        }

        const horas = Math.floor(totalSegundos / 3600);
        const minutos = Math.floor((totalSegundos % 3600) / 60);
        const segundos = totalSegundos % 60;

        return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    };

}
