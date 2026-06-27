import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB11NgisoLkCVQeDuEtT_XRXAokKmBVbY0",
  authDomain: "drg-clinic.firebaseapp.com",
  projectId: "drg-clinic",
  storageBucket: "drg-clinic.firebasestorage.app",
  messagingSenderId: "74312540287",
  appId: "1:74312540287:android:7db4b713ae8b1cd5495f4a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.querySelector("#lookupForm");
const resultPanel = document.querySelector("#resultPanel");
const verifyButton = document.querySelector("#verifyButton");

const cleanMobile = (value) => String(value || "").replace(/\D/g, "").slice(-10);

const money = (value) => {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
};

const escapeHtml = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

const setStatus = (message, tone = "info") => {
  resultPanel.innerHTML = `<div class="status ${tone === "error" ? "error" : ""}">${escapeHtml(message)}</div>`;
};

const renderList = (items, emptyText = "-") => {
  if (!items?.length) return `<p>${escapeHtml(emptyText)}</p>`;
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
};

const renderPrescription = (visit) => {
  const clinical = visit.clinical || {};
  const medicines = (visit.medicines || []).map((medicine) => {
    const name = escapeHtml(medicine.medicineName || "Medicine");
    const timing = escapeHtml(medicine.timing || "-");
    const days = escapeHtml(medicine.days || "-");
    const quantity = escapeHtml(medicine.quantity || "-");
    return `${name} | ${timing} | ${days} days | Qty ${quantity}`;
  });
  const invoice = visit.invoice || {};
  const invoiceItems = (invoice.items || []).map((item) => (
    `<div class="money-row"><span>${escapeHtml(item.itemName || "Item")}</span><strong>${money(item.price)}</strong></div>`
  )).join("");

  resultPanel.innerHTML = `
    <div class="prescription-header">
      <div>
        <span class="eyebrow">Verified Prescription</span>
        <h2>${escapeHtml(visit.patientName || "Patient")}</h2>
        <p>${escapeHtml(visit.drgNumber || "")} · ${escapeHtml(visit.date || "")}</p>
      </div>
      <span class="badge">Matched</span>
    </div>
    <div class="detail-grid">
      <article class="detail-card">
        <h3>Observation</h3>
        <p>${escapeHtml(clinical.observation || "-")}</p>
      </article>
      <article class="detail-card">
        <h3>Treatment today</h3>
        <p>${escapeHtml(clinical.treatmentToday || "-")}</p>
      </article>
      <article class="detail-card full">
        <h3>Advice</h3>
        <p>${escapeHtml(clinical.advice || "-")}</p>
      </article>
      <article class="detail-card full">
        <h3>Medicines</h3>
        ${renderList(medicines, "No medicine entries found.")}
      </article>
      <article class="detail-card full">
        <h3>Invoice</h3>
        ${invoiceItems || "<p>No invoice items found.</p>"}
        <div class="money-row"><span>Previous balance</span><strong>${money(invoice.previousBalance)}</strong></div>
        <div class="money-row"><span>Amount paid</span><strong>${money(invoice.amountPaid)}</strong></div>
        <div class="money-row"><span>Total bill</span><strong>${money(invoice.totalBillAmount)}</strong></div>
        <div class="money-row"><span>Balance left</span><strong>${money(invoice.balanceLeft)}</strong></div>
      </article>
    </div>
  `;
};

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const drgNumber = form.drgNumber.value.trim().toUpperCase();
  const mobile = cleanMobile(form.mobile.value);

  if (!drgNumber || mobile.length !== 10) {
    setStatus("Please enter a valid DRG number and 10 digit mobile number.", "error");
    return;
  }

  verifyButton.disabled = true;
  verifyButton.textContent = "Checking...";
  setStatus("Checking prescription details. Please wait...");

  try {
    const lookup = query(
      collection(db, "visits"),
      where("drgNumber", "==", drgNumber),
      where("patientMobile", "==", mobile),
      limit(1)
    );
    const snapshot = await getDocs(lookup);
    if (snapshot.empty) {
      setStatus("No prescription matched this DRG number and mobile number. Please check the details and try again.", "error");
      return;
    }
    renderPrescription({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
  } catch (error) {
    console.error(error);
    setStatus("Prescription lookup failed. Please try again or contact clinic support.", "error");
  } finally {
    verifyButton.disabled = false;
    verifyButton.textContent = "Find prescription";
  }
});
