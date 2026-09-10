(() => {
  const bibtex = {
    "Memclave: Secure In-Memory Enclave for Untrusted Hosts": `@inproceedings{choudhari2026memclave,
  author = {Amit Choudhari and Fabian van Rissenbeck and Christian Rossow},
  title = {Memclave: Secure {In-Memory} Enclave for Untrusted Hosts},
  booktitle = {35th USENIX Security Symposium (USENIX Security 26)},
  year = {2026},
  isbn = {978-1-939133-58-8},
  address = {Baltimore, MD},
  pages = {5731--5750},
  url = {https://www.usenix.org/conference/usenixsecurity26/presentation/choudhari},
  publisher = {USENIX Association},
  month = aug
}`,

    "NICraft: Malicious NIC Firmware-Based Cache Side-Channel Attack": `@inproceedings{choudhari2025nicraft,
  author = {Choudhari, Amit and Kumar, Shorya and Rossow, Christian},
  title = {NICraft: Malicious NIC Firmware-Based Cache Side-Channel Attack},
  booktitle = {Computer Security -- ESORICS 2025},
  year = {2025},
  pages = {64--83},
  publisher = {Springer},
  doi = {10.1007/978-3-032-07894-0_4},
  url = {https://doi.org/10.1007/978-3-032-07894-0_4}
}`,

    "FetchBench: Systematic Identification and Characterization of Proprietary Prefetchers": `@inproceedings{schlueter2023fetchbench,
  author = {Schl{\\\"u}ter, Till and Choudhari, Amit and Hetterich, Lorenz and Trampert, Leon and Nemati, Hamed and Ibrahim, Ahmad and Schwarz, Michael and Rossow, Christian and Tippenhauer, Nils Ole},
  title = {FetchBench: Systematic Identification and Characterization of Proprietary Prefetchers},
  booktitle = {Proceedings of the 2023 ACM SIGSAC Conference on Computer and Communications Security},
  year = {2023},
  pages = {975--989},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  doi = {10.1145/3576915.3623124},
  url = {https://doi.org/10.1145/3576915.3623124}
}`,

    "SpecDefender: Transient Execution Attack Defender Using Performance Counters": `@inproceedings{choudhari2022specdefender,
  author = {Choudhari, Amit and Guilley, Sylvain and Karray, Khaled},
  title = {SpecDefender: Transient Execution Attack Defender Using Performance Counters},
  booktitle = {Proceedings of the 2022 Workshop on Attacks and Solutions in Hardware Security},
  year = {2022},
  pages = {15--24},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  doi = {10.1145/3560834.3563830},
  url = {https://doi.org/10.1145/3560834.3563830}
}`,

    "CRYScanner: Finding Cryptographic Libraries Misuse": `@inproceedings{choudhari2021cryscanner,
  author = {Choudhari, Amit and Guilley, Sylvain and Karray, Khaled},
  title = {CRYScanner: Finding Cryptographic Libraries Misuse},
  booktitle = {2021 8th NAFOSTED Conference on Information and Computer Science (NICS)},
  year = {2021},
  pages = {230--235},
  publisher = {IEEE},
  doi = {10.1109/NICS54270.2021.9701469},
  url = {https://doi.org/10.1109/NICS54270.2021.9701469}
}`
  };

  const style = document.createElement("style");
  style.textContent = `
    .bibtex-copy {
      padding: 0;
      font: inherit;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
    }
    .bibtex-mark {
      display: block;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
      font-weight: 600;
      line-height: 1;
      transform: translateY(-.3px);
    }
    .bibtex-toast {
      position: fixed;
      left: 50%;
      bottom: 24px;
      z-index: 50;
      transform: translate(-50%, 10px);
      padding: 8px 11px;
      border: 1px solid #343434;
      border-radius: 7px;
      background: #111;
      color: #d8d8d5;
      font-size: .78rem;
      line-height: 1.2;
      opacity: 0;
      pointer-events: none;
      transition: opacity 140ms ease, transform 140ms ease;
    }
    .bibtex-toast.visible {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  `;
  document.head.appendChild(style);

  const toast = document.createElement("div");
  toast.className = "bibtex-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 1500);
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    if (!ok) throw new Error("copy failed");
  }

  document.querySelectorAll(".publication").forEach((publication) => {
    const title = publication.querySelector("h3")?.textContent.trim();
    const entry = bibtex[title];
    const links = publication.querySelector(".publication-links");
    if (!entry || !links) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "resource-link bibtex-copy";
    button.title = "Copy BibTeX";
    button.setAttribute("aria-label", `Copy BibTeX for ${title}`);
    button.innerHTML = '<span class="bibtex-mark" aria-hidden="true">@</span>';
    button.addEventListener("click", async () => {
      try {
        await copyText(entry);
        showToast("BibTeX copied");
      } catch {
        showToast("Could not copy BibTeX");
      }
    });
    links.appendChild(button);
  });
})();
