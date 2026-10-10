import {
  COUNTRY_DIAL_CODES,
  formatDialLabel,
} from "../../lib/projectRequest/countryCodes";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 18px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(10rem, 44%) minmax(0, 1fr);
  gap: 12px;
  align-items: end;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const Field = styled.div`
  position: relative;
`;

const controlStyles = `
  display: block;
  width: 100%;
  padding: 26px 2px 10px;
  font-size: 17px;
  line-height: 1.4;
  color: var(--color-text);
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--color-card-border);
  border-radius: 0;
  transition: border-color var(--duration-fast) linear, box-shadow var(--duration-fast) linear;

  &:hover {
    border-bottom-color: var(--color-muted);
  }

  &:focus {
    outline: none;
    border-bottom-color: var(--color-text);
    box-shadow: 0 1px 0 0 var(--color-text);
  }

  &[aria-invalid="true"] {
    border-bottom-color: var(--color-accent);
  }
`;

const Label = styled.label`
  position: absolute;
  top: 18px;
  left: 2px;
  font-size: 16px;
  line-height: 1.2;
  color: var(--color-muted);
  pointer-events: none;
  transform-origin: left top;
  transition: transform 180ms var(--ease-out-expo), color var(--duration-fast) linear;
`;

const Select = styled.select`
  ${controlStyles}
  appearance: none;
  cursor: pointer;
  padding-right: 1.25rem;
  background-image: linear-gradient(45deg, transparent 50%, var(--color-muted) 50%),
    linear-gradient(135deg, var(--color-muted) 50%, transparent 50%);
  background-position: calc(100% - 12px) calc(50% + 8px), calc(100% - 7px) calc(50% + 8px);
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;

  &:focus + ${Label},
  &:valid + ${Label} {
    transform: translateY(-10px) scale(0.78);
    color: var(--color-text);
  }
`;

const Input = styled.input`
  ${controlStyles}

  &:focus + ${Label},
  &:not(:placeholder-shown) + ${Label} {
    transform: translateY(-10px) scale(0.78);
  }

  &:focus + ${Label} {
    color: var(--color-text);
  }
`;

const Meta = styled.div`
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.4;
  color: var(--color-text);
  font-weight: 600;
`;

type Props = {
  countryIso: string;
  phone: string;
  onCountryChange: (iso: string) => void;
  onPhoneChange: (phone: string) => void;
  onBlur?: () => void;
  error?: string;
  phoneMaxLength?: number;
};

export function PhoneField({
  countryIso,
  phone,
  onCountryChange,
  onPhoneChange,
  onBlur,
  error,
  phoneMaxLength = 40,
}: Props) {
  const messageId = "phone-message";

  return (
    <Wrapper>
      <Row>
        <Field>
          <Select
            id="countryCode"
            name="countryCode"
            value={countryIso}
            required
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? messageId : undefined}
            onChange={(event) => onCountryChange(event.target.value)}
            onBlur={onBlur}
          >
            {COUNTRY_DIAL_CODES.map((country) => (
              <option key={country.iso} value={country.iso}>
                {formatDialLabel(country)}
              </option>
            ))}
          </Select>
          <Label htmlFor="countryCode">Country code</Label>
        </Field>

        <Field>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder=" "
            required
            maxLength={phoneMaxLength}
            value={phone}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? messageId : undefined}
            onChange={(event) => onPhoneChange(event.target.value)}
            onBlur={onBlur}
          />
          <Label htmlFor="phone">Phone number</Label>
        </Field>
      </Row>
      {error ? (
        <Meta>
          <span id={messageId}>{error}</span>
        </Meta>
      ) : null}
    </Wrapper>
  );
}
