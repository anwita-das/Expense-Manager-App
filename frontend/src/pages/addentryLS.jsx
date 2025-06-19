import dayjs from "dayjs";

function AddEntryLS() {
    const now = dayjs(); // current date & time
    const formatted = now.format("DD MMM YYYY, hh:mm A");
    return(
        <>
            <div>{formatted}</div>
        </>
    );
}

export default AddEntryLS;