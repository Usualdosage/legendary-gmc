import { Log } from "../components/logger";

/**
 * Loads the active campaign.
 */
export function loadActiveCampaign() {
  const savedCampaigns = localStorage.getItem("dmc_campaigns");
  if (savedCampaigns) {
    let campaigns = JSON.parse(savedCampaigns);

    let activeCampaigns = campaigns.filter((obj) => {
      return obj.isActive;
    });

    if (Array.isArray(activeCampaigns)) {
      if (activeCampaigns.length > 0) {
        return activeCampaigns[0];
      } else {
        window.location.href = "/";
      }
    }
  } else {
    window.location.href = "/";
  }
}

/**
 * Exports all campaigns to disk (JSON format)
 */
export function exportCampaigns() {
  const campaigns = JSON.parse(localStorage.getItem("dmc_campaigns"));
  const blob = new Blob([JSON.stringify(campaigns, null, 2)], {type : 'application/json'});
  const a = document.createElement('a');
  a.download = 'legendary-campaigns.json';
  a.href = URL.createObjectURL(blob);
  a.addEventListener('click', (e) => {
    setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
  });
  a.click();
}

/**
 * Deletes a campaign from local storage.
 */
export function deleteActiveCampaign() {
  const campaigns = JSON.parse(localStorage.getItem("dmc_campaigns"));
  const campaign = loadActiveCampaign();

  Log(campaign);

  let index = campaigns.findIndex((obj) => {
    return obj.name.toLowerCase() === campaign.name.toLowerCase();
  });

  campaigns[index] = {};
  localStorage.setItem("dmc_campaigns", JSON.stringify(campaigns));
}

/**
 * Deletes all saved data.
 */
export function resetCampaigns() {
  localStorage.removeItem("dmc_campaigns");
}

/**
 * Saves any campaign to local storage.
 */
export function saveCampaign(campaign) {
  if (campaign === null) return;

  const savedCampaigns = localStorage.getItem("dmc_campaigns");
  if (savedCampaigns) {
    let campaigns = JSON.parse(savedCampaigns);
    let index = campaigns.findIndex((obj) => {
      return obj.name.toLowerCase() === campaign.name.toLowerCase();
    });
    campaigns[index] = campaign;
    localStorage.setItem("dmc_campaigns", JSON.stringify(campaigns));
  } else {
    window.location.href = "/";
  }
}

/**
 * Saves the active campaign to local storage.
 */
export function saveActiveCampaign(campaign) {
  if (campaign === null) return;

  const savedCampaigns = localStorage.getItem("dmc_campaigns");
  if (savedCampaigns) {
    let campaigns = JSON.parse(savedCampaigns);
    let index = campaigns.findIndex((obj) => {
      return obj.isActive;
    });
    campaigns[index] = campaign;
    localStorage.setItem("dmc_campaigns", JSON.stringify(campaigns));
  } else {
    window.location.href = "/";
  }
}

/**
 * Generates a random number up to the max. Will never return zero.
 */
export function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

/**
 * For a given number of seconds, will return an time like HH:MM:SS.
 */
export function formatTime(seconds) {
      const formatted = new Date(seconds * 1000)
          .toISOString()
          .substr(11, 8);
      return formatted;
};