export function formatDateInProjects(
  sdate: string | null | undefined,
  edate: string | null | undefined,
): string {
  let strDate = "";
  if (sdate && sdate !== "") {
    strDate = new Date(sdate).getFullYear().toString();
  }
  let endDate = "Present";
  if (edate && edate !== "") {
    endDate = new Date(edate).getFullYear().toString();
  }

  if (strDate === endDate) {
    return strDate;
  } else {
    return strDate + " - " + endDate;
  }
}
