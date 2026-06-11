// header.js
export function addJunkHeader() {
    const chars = "0123456789!@#$%^&*()_+{}[]|:;<>,.?/~`";
    let header = "-- ";
    
    // Create a 5-line block of junk
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 40; j++) {
            header += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        header += "\n-- ";
    }
    return header + "\n\n";
}
