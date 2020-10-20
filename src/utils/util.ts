export const roundNumber = (input: number, decimals: number) => 
    Math.round(input * parseFloat(`1e${decimals}`)) / parseFloat(`1e${decimals}`);