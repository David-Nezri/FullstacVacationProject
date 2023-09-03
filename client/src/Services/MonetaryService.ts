class MonetaryService {

    public getVat(price: number, percent: number): number {
        return price * percent / 100;
    }
    
}

const monetaryService = new MonetaryService();

export default monetaryService;
