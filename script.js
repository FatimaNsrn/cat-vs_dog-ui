"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const uploadForm = document.getElementById("uploadForm");
const imageInput = document.getElementById("imageInput");
const resultDiv = document.getElementById("result");
uploadForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    e.preventDefault();
    const file = (_a = imageInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (!file) {
        resultDiv.textContent = "Please upload an image!";
        return;
    }
    const formData = new FormData();
    formData.append("image", file);
    resultDiv.textContent = "Predicting... 🧠";
    try {
        const response = yield fetch("http://localhost:5000/predict", {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error("Prediction failed.");
        }
        const data = yield response.json();
        resultDiv.textContent = `Prediction: ${data.label === "cat" ? "🐱 Cat" : "🐶 Dog"}`;
    }
    catch (error) {
        console.error(error);
        resultDiv.textContent = "Oops! Something went wrong.";
    }
}));
