(() => {
  // Citation metadata follows the authoritative venue/publisher records.
  // Entries intentionally omit abstracts and keywords for clean copy/paste use.
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
  booktitle = {Computer Security -- ESORICS 2025: 30th European Symposium on Research in Computer Security, Toulouse, France, September 22--24, 2025, Proceedings, Part III},
  year = {2025},
  isbn = {978-3-032-07893-3},
  publisher = {Springer-Verlag},
  address = {Berlin, Heidelberg},
  pages = {64--83},
  doi = {10.1007/978-3-032-07894-0_4},
  url = {https://doi.org/10.1007/978-3-032-07894-0_4}
}`,

    "FetchBench: Systematic Identification and Characterization of Proprietary Prefetchers": `@inproceedings{schlueter2023fetchbench,
  author = {Schlüter, Till and Choudhari, Amit and Hetterich, Lorenz and Trampert, Leon and Nemati, Hamed and Ibrahim, Ahmad and Schwarz, Michael and Rossow, Christian and Tippenhauer, Nils Ole},
  title = {FetchBench: Systematic Identification and Characterization of Proprietary Prefetchers},
  booktitle = {Proceedings of the 2023 ACM SIGSAC Conference on Computer and Communications Security},
  year = {2023},
  isbn = {9798400700507},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  pages = {975--989},
  location = {Copenhagen, Denmark},
  series = {CCS '23},
  doi = {10.1145/3576915.3623124},
  url = {https://doi.org/10.1145/3576915.3623124}
}`,

    "SpecDefender: Transient Execution Attack Defender Using Performance Counters": `@inproceedings{choudhari2022specdefender,
  author = {Choudhari, Amit and Guilley, Sylvain and Karray, Khaled},
  title = {SpecDefender: Transient Execution Attack Defender Using Performance Counters},
  booktitle = {Proceedings of the 2022 Workshop on Attacks and Solutions in Hardware Security},
  year = {2022},
  isbn = {9781450398848},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  pages = {15--24},
  location = {Los Angeles, CA, USA},
  series = {ASHES '22},
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
    .publication-links { position: relative; }

    .bibtex-trigger {
      width: auto;
      min-width: 60px;
      padding: 0 10px;
      border-radius: 999px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: .68rem;
      font-weight: 600;
      line-height: 1;
      letter-spacing: .01em;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
    }

    .bibtex-popover {
      position: absolute;
      left: 0;
      top: calc(100% + 10px);
      z-index: 30;
      width: min(430px, calc(100vw - 40px));
      padding: 12px;
      border: 1px solid #343434;
      border-radius: 9px;
      background: #111;
      box-shadow: 0 14px 36px rgba(0,0,0,.36);
    }

    .bibtex-popover[hidden] { display: none; }

    .bibtex-popover-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 9px;
    }

    .bibtex-popover-title {
      color: #d4d4d1;
      font-size: .75rem;
      font-weight: 650;
    }

    .bibtex-copy-button {
      padding: 4px 8px;
      border: 1px solid #343434;
      border-radius: 6px;
      background: transparent;
      color: #a0a09b;
      font: inherit;
      font-size: .72rem;
      cursor: pointer;
      transition: color 140ms ease, border-color 140ms ease, background-color 140ms ease;
    }

    .bibtex-copy-button:hover,
    .bibtex-copy-button:focus-visible {
      color: #9fc5ff;
      border-color: #5c718e;
      background: rgba(159,197,255,.045);
    }

    .bibtex-copy-button:focus-visible {
      outline: 2px solid #9fc5ff;
      outline-offset: 2px;
    }

    .bibtex-code {
      max-height: 250px;
      margin: 0;
      padding: 10px;
      overflow: auto;
      border: 1px solid #252525;
      border-radius: 6px;
      background: #0b0b0b;
      color: #bdbdb9;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: .72rem;
      line-height: 1.5;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }

    @media (max-width: 620px) {
      .bibtex-popover {
        width: min(430px, calc(100vw - 38px));
      }
    }
  `;
  document.head.appendChild(style);

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

  let openPopover = null;
  let openTrigger = null;

  function closePopover({ restoreFocus = false } = {}) {
    if (!openPopover || !openTrigger) return;
    openPopover.hidden = true;
    openTrigger.setAttribute("aria-expanded", "false");
    if (restoreFocus) openTrigger.focus();
    openPopover = null;
    openTrigger = null;
  }

  document.querySelectorAll(".publication").forEach((publication, index) => {
    const title = publication.querySelector("h3")?.textContent.trim();
    const entry = bibtex[title];
    const links = publication.querySelector(".publication-links");
    if (!entry || !links) return;

    const popoverId = `bibtex-popover-${index + 1}`;

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "resource-link bibtex-trigger";
    trigger.textContent = "BibTeX";
    trigger.title = "Show BibTeX";
    trigger.setAttribute("aria-label", `Show BibTeX for ${title}`);
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", popoverId);

    const popover = document.createElement("div");
    popover.id = popoverId;
    popover.className = "bibtex-popover";
    popover.hidden = true;
    popover.setAttribute("role", "dialog");
    popover.setAttribute("aria-label", `BibTeX citation for ${title}`);

    const head = document.createElement("div");
    head.className = "bibtex-popover-head";

    const label = document.createElement("span");
    label.className = "bibtex-popover-title";
    label.textContent = "BibTeX";

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "bibtex-copy-button";
    copyButton.textContent = "Copy";
    copyButton.setAttribute("aria-label", `Copy BibTeX for ${title}`);

    const pre = document.createElement("pre");
    pre.className = "bibtex-code";
    const code = document.createElement("code");
    code.textContent = entry;
    pre.appendChild(code);

    head.append(label, copyButton);
    popover.append(head, pre);
    links.append(trigger, popover);

    trigger.addEventListener("click", () => {
      const isOpen = openPopover === popover;
      closePopover();
      if (isOpen) return;

      popover.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      openPopover = popover;
      openTrigger = trigger;
    });

    copyButton.addEventListener("click", async () => {
      const original = copyButton.textContent;
      try {
        await copyText(entry);
        copyButton.textContent = "Copied";
      } catch {
        copyButton.textContent = "Copy failed";
      }
      setTimeout(() => {
        copyButton.textContent = original;
      }, 1400);
    });
  });

  document.addEventListener("click", (event) => {
    if (!openPopover || !openTrigger) return;
    if (openPopover.contains(event.target) || openTrigger.contains(event.target)) return;
    closePopover();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && openPopover) {
      closePopover({ restoreFocus: true });
    }
  });
})();
