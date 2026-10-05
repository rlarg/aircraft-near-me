"use client";

import { useEffect, useRef, useState, type SubmitEvent, type MouseEvent } from "react";
import Link from "next/link";

// Validate postcode format only; this does not confirm that a postcode exists.
const UK_POSTCODE_PATTERN = /^(?:GIR0AA|[A-PR-UWYZ](?:\d{1,2}|[A-HK-Y]\d{1,2}|\d[A-HJKSTUW]|[A-HK-Y]\d[ABEHMNPRV-Y])\d[ABD-HJLNP-UW-Z]{2})$/;

export default function Home() {
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const summary = useRef<HTMLDivElement>(null);
  const results = useRef<HTMLElement>(null);
  const postcodeInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) summary.current?.focus();
    else if (location) results.current?.focus();
  }, [error, location]);

  function resetSearch(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setLocation("");
    setPostcode("");
    setError("");
    requestAnimationFrame(() => postcodeInput.current?.focus());
  }

  function findAircraft(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = postcode.trim().toUpperCase().replace(/\s/g, "");
    setLocation("");
    if (!UK_POSTCODE_PATTERN.test(value)) {
      setError("This isn't a valid postcode.");
      summary.current?.focus();
      return;
    }
    setError("");
    setLocation(`${value.slice(0, -3)} ${value.slice(-3)}`);
  }

  return (
    <>
      <header className="govuk-generic-header aircraft-header">
        <div className="govuk-generic-header__container govuk-width-container">
          <div className="govuk-generic-header__logo aircraft-header__inner">
            <Link href="/" onClick={resetSearch} className="govuk-generic-header__homepage-link aircraft-header__brand">
              <span className="aircraft-header__icon" aria-hidden="true" />
              <span>Aircraft Near Me</span>
            </Link>
          </div>
        </div>
      </header>
      <div className="govuk-width-container aircraft-content">
        <div className="govuk-phase-banner">
          <p className="govuk-phase-banner__content">
            <strong className="govuk-tag govuk-phase-banner__content__tag">Prototype</strong>
            <span className="govuk-phase-banner__text">This is a demo service using sample aircraft data.</span>
          </p>
        </div>
        <main id="main-content" className="govuk-main-wrapper aircraft-main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Find the nearest aircraft</h1>
              {!location && <p className="govuk-body">Enter a UK postcode to find the nearest aircraft to you.</p>}
              {error && (
                <div className="govuk-error-summary" ref={summary} tabIndex={-1} role="alert" aria-labelledby="error-title">
                  <h2 className="govuk-error-summary__title" id="error-title">There is a problem</h2>
                  <div className="govuk-error-summary__body">
                    <ul className="govuk-list govuk-error-summary__list"><li><a href="#postcode">{error}</a></li></ul>
                  </div>
                </div>
              )}
              <form className="aircraft-postcode-panel" onSubmit={findAircraft} hidden={Boolean(location)} noValidate>
                <div className={`govuk-form-group${error ? " govuk-form-group--error" : ""}`}>
                  <label className="govuk-label" htmlFor="postcode">Enter a postcode</label>
                  <div className="govuk-hint" id="postcode-hint">For example SW1A 2AA</div>
                  {error && <p className="govuk-error-message" id="postcode-error"><span className="govuk-visually-hidden">Error: </span>{error}</p>}
                  <input ref={postcodeInput} className={`govuk-input${error ? " govuk-input--error" : ""}`} id="postcode" name="postcode" type="text" autoComplete="postal-code" autoCapitalize="characters" spellCheck={false} aria-describedby={`postcode-hint${error ? " postcode-error" : ""}`} aria-invalid={error ? true : undefined} value={postcode} onChange={(event) => setPostcode(event.target.value)} />
                </div>
                <button className="govuk-button" type="submit">Find</button>
                <p className="govuk-body">
                  <a className="govuk-link" href="https://www.royalmail.com/find-a-postcode">Find a postcode on Royal Mail&apos;s postcode finder</a>
                </p>
              </form>
              {location && (
                <section ref={results} tabIndex={-1} aria-labelledby="results-title" className="aircraft-results">
                  <h2 className="govuk-heading-m" id="results-title">The nearest aircraft is an Airbus A320.</h2>
                  <p className="govuk-body">This is a sample aircraft to demonstrate the service. Its position and details are not live.</p>
                  <dl className="govuk-summary-list">
                    {[
                      ["Flight number", "DEMO101"],
                      ["Distance from you", "2.4 miles"],
                      ["Altitude", "12,000 ft"],
                      ["Direction of travel", "North-east (045°)"],
                    ].map(([label, value]) => (
                      <div className="govuk-summary-list__row" key={label}>
                        <dt className="govuk-summary-list__key">{label}</dt>
                        <dd className="govuk-summary-list__value">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="govuk-body">
                    <a className="govuk-link" href="#postcode" onClick={resetSearch}>Search for a different aircraft</a>
                  </p>
                </section>
              )}
            </div>
          </div>
        </main>
      </div>
      <footer className="govuk-footer aircraft-footer">
        <div className="govuk-width-container">
          <div className="govuk-footer__meta">
            <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
              <p className="govuk-body govuk-!-margin-bottom-0 aircraft-footer__text">Aircraft near me — a prototype using sample data.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
