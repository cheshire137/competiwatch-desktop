import DayTimeApproximator from "../../models/DayTimeApproximator";

it('returns "weekend" for Sunday date', () => {
  const date = new Date("2018-08-05T12:00:00");
  const actual = DayTimeApproximator.dayOfWeek(date);
  expect(actual).toBe("weekend");
});

it('returns "weekend" for Saturday date', () => {
  const date = new Date("2018-08-04T12:00:00");
  const actual = DayTimeApproximator.dayOfWeek(date);
  expect(actual).toBe("weekend");
});

it('returns "weekday" for Monday date', () => {
  const date = new Date("2018-08-06T12:00:00");
  const actual = DayTimeApproximator.dayOfWeek(date);
  expect(actual).toBe("weekday");
});

it('returns "weekday" for Tuesday date', () => {
  const date = new Date("2018-08-07T12:00:00");
  const actual = DayTimeApproximator.dayOfWeek(date);
  expect(actual).toBe("weekday");
});

it('returns "weekday" for Wednesday date', () => {
  const date = new Date("2018-08-08T12:00:00");
  const actual = DayTimeApproximator.dayOfWeek(date);
  expect(actual).toBe("weekday");
});

it('returns "weekday" for Thursday date', () => {
  const date = new Date("2018-08-09T12:00:00");
  const actual = DayTimeApproximator.dayOfWeek(date);
  expect(actual).toBe("weekday");
});

it('returns "weekday" for Friday date', () => {
  const date = new Date("2018-08-10T12:00:00");
  const actual = DayTimeApproximator.dayOfWeek(date);
  expect(actual).toBe("weekday");
});

it('returns "morning" for morning time', () => {
  const date = new Date(946731600000); // 7am CDT
  const actual = DayTimeApproximator.timeOfDay(date);
  expect(actual).toBe("morning");
});

it('returns "afternoon" for afternoon time', () => {
  const date = new Date(1534702539736); // 1:15pm CDT
  const actual = DayTimeApproximator.timeOfDay(date);
  expect(actual).toBe("afternoon");
});
