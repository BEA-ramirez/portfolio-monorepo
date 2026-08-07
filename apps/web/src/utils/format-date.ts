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

export function formatDateToText(
  sdate: string | null | undefined,
  edate: string | null | undefined,
): string {
  let strDate = "";
  if (sdate && sdate !== "") {
    strDate = new Date(sdate).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
  let endDate = "Present";
  if (edate && edate !== "") {
    endDate = new Date(edate).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }

  if (strDate === endDate) {
    return strDate;
  } else {
    return strDate + " - " + endDate;
  }
}
