export const getFormattedTime = (dateString)=>{
    if(!dateString) return;
    
    const date = new Date(dateString);
    let minutes = date.getMinutes() , hours = date.getHours();
    const timeState= hours >=12 ? "PM" : "AM";    

    hours%=12;
    if(hours<10) hours="0"+hours;
    if(minutes<10) minutes="0"+minutes;
    return `${hours}:${minutes} ${timeState}`    
}

export const getFormattedDate = (dateString) => {
    if(!dateString) return;

    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // Check if the provided date is today
    if (date.toDateString() === today.toDateString()) {
        return "Today";
    }

    // Check if the provided date is yesterday
    if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    }

    // Format day and month to always be two digits
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    // Return formatted date
    return `${day}-${month}-${year}`;
}
