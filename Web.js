const api = "https://script.google.com/macros/s/AKfycbyBgbz0TtSZDXa-pdjsfJtUAl9hENnknH9EZelxWlN-Z0cPOgHLDxn6yJYEYUSMqpk/exec";
let currentBarcode = null;

function searchItem() {
    const barcode = document.getElementById("barcodeInput").value;
    currentBarcode = barcode;

    fetch(`${api}?action=search&barcode=${barcode}`)
    .then(res => res.json())
    .then(data => {
        if(data.notFound){
            document.getElementById("addForm").style.display = "block";
            return;
        }

        document.getElementById("barcode").innerText = data.barcode;
        document.getElementById("item").innerText = data.item;
        document.getElementById("desc").innerText = data.desc;
        document.getElementById("lokasi").innerText = data.lokasi;
        document.getElementById("qty").innerText = data.qty;
    });
}

function addItem(){
    const payload = {
        action:"addItem",
        barcode: currentBarcode,
        item: document.getElementById("newItem").value,
        desc: document.getElementById("newDesc").value,
        lokasi: document.getElementById("newLokasi").value,
        qty: document.getElementById("newQty").value
    };

    fetch(api,{
        method:"POST",
        body: JSON.stringify(payload)
    }).then(()=>alert("Barang ditambahkan"));
}

function updateQty(change){
    fetch(`${api}?action=updateQty&barcode=${currentBarcode}&change=${change}`)
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("qty").innerText = data.qty;
    });
}

function scanCamera(){
    const scanner = new Html5Qrcode("reader");

    scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        barcode => {
            document.getElementById("barcodeInput").value = barcode;
            searchItem();
            scanner.stop();
        }
    );
}
