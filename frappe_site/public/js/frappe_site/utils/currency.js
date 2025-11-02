// Currency formatting utility
// Uses Frappe's currency formatting

export function formatCurrency(price, currency = null) {
  if (!price && price !== 0) {
    return 'Price on request';
  }

  // Use Frappe's format function which handles currency automatically
  if (typeof frappe !== 'undefined' && frappe.format) {
    try {
      // frappe.format automatically uses system currency from settings
      const formatted = frappe.format(price, {
        fieldtype: 'Currency',
      });

      // frappe.format returns HTML string like "<div style='text-align: right'>USD 0.00</div>"
      // Extract text content and remove HTML tags
      if (typeof formatted === 'string') {
        // Remove HTML tags and get text content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = formatted;
        const textContent = tempDiv.textContent || tempDiv.innerText || formatted;

        // Clean up whitespace
        return textContent.trim();
      }

      return formatted;
    } catch (e) {
      console.warn('Currency format error:', e);
      // Fallback to manual formatting
    }
  }

  // Fallback: manual formatting
  return formatCurrencyManual(price, currency);
}

// Get currency from Frappe settings
function getCurrency() {
  if (typeof frappe !== 'undefined') {
    // Try boot.sysdefaults first (most reliable)
    if (frappe.boot?.sysdefaults?.currency) {
      return frappe.boot.sysdefaults.currency;
    }

    // Try frappe.defaults
    if (frappe.defaults?.get_default) {
      return frappe.defaults.get_default('currency');
    }

    // Try frappe.sys_defaults
    if (frappe.sys_defaults?.currency) {
      return frappe.sys_defaults.currency;
    }
  }

  return null;
}

// Manual currency formatting fallback
function formatCurrencyManual(price, currency = null) {
  const currencyCode = currency || getCurrency() || '';
  const formattedNumber = formatNumber(price);

  if (!currencyCode) {
    return formattedNumber;
  }

  // Get currency symbol position
  const symbolPosition = getCurrencySymbolPosition();

  if (symbolPosition === 'after') {
    return `${formattedNumber} ${currencyCode}`;
  } else {
    return `${currencyCode} ${formattedNumber}`;
  }
}

// Get currency symbol position
function getCurrencySymbolPosition() {
  if (typeof frappe !== 'undefined' && frappe.boot?.sysdefaults) {
    return frappe.boot.sysdefaults.currency_symbol_position || 'before';
  }
  return 'before';
}

// Format number according to Frappe's number format
function formatNumber(number, format = null) {
  const numberFormat = format || getNumberFormat();

  // Parse Frappe number format (e.g., "#,###.##")
  const parts = numberFormat.split('.');
  const decimalPart = parts[1] || '##';

  // Count decimal places
  const decimalPlaces = decimalPart.length || 2;

  return number.toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
}

// Get number format from Frappe
function getNumberFormat() {
  if (typeof frappe !== 'undefined' && frappe.boot?.sysdefaults) {
    return frappe.boot.sysdefaults.number_format || '#,###.##';
  }
  return '#,###.##';
}

// Get currency symbol from Frappe settings
export function getCurrencySymbol() {
  return getCurrency();
}
