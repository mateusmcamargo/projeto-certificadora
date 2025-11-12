
export const calcTotalExpenses = (purchasesList) => {
    const currentDate = new Date();
    return purchasesList.length == 0 ? 0 : purchasesList.reduce((total, c) => {
        const date = c.data.toDate();
        if(date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()){
            return total + c.price * c.qtd;
        }
        return total;
    }, 0);
}