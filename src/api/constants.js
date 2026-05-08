/**
 * Shared constants — measurement types and their valid units.
 * Mirrors the validation rules in QuantityDTO.java.
 */

export const MEASUREMENT_TYPES = [
  "LengthUnit",
  "VolumeUnit",
  "WeightUnit",
  "TemperatureUnit",
];

export const UNITS_BY_TYPE = {
  LengthUnit:      ["FEET", "INCHES", "YARDS", "CENTIMETERS", "METERS", "KILOMETERS", "MILES"],
  VolumeUnit:      ["MILLILITER", "LITRE", "GALLON", "CUBIC_METER", "CUBIC_CENTIMETER"],
  WeightUnit:      ["GRAM", "KILOGRAM", "MILLIGRAM", "POUND", "TONNE"],
  TemperatureUnit: ["CELSIUS", "FAHRENHEIT", "KELVIN"],
};

export const OPERATION_TYPES = ["COMPARE", "CONVERT", "ADD", "SUBTRACT", "DIVIDE"];