const apiUrl = "https://script.google.com/macros/s/AKfycbxaPJClg7MtaiqxJRLwC9HZHWB2ifm4GwslcF8aVPzjjjLgOH7MXzeVAs0SFrYzpng/exec";

function cariBarang() {
    const barcode = document.getElementById("barcodeInput").value;

    fetch(`${apiUrl}?barcode=${barcode}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }

            document.getElementById("lokasi").innerText = data.lokasi;
            document.getElementById("barcode").innerText = data.barcode;
            document.getElementById("item").innerText = data.item;
            document.getElementById("desc").innerText = data.desc;
            document.getElementById("qty").innerText = data.qty;
        });
}
