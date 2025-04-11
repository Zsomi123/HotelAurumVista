class BookingForm {
    constructor() {
        this.form = document.getElementById('booking-form');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.setMinDates();
    }

    setMinDates() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('arrival-date').min = today;
        document.getElementById('departure-date').min = today;
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        console.log('Booking data:', Object.fromEntries(formData));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('booking-form')) {
        new BookingForm();
    }
});