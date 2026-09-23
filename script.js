const galleryData = {
  axialeaa: {
    path: "assets/icons/axialeaa",
    galleries: {
      Isometric: [
        "chiseled_bookshelf.png",
        "crafter.png",
        "deepslate_diamond_ore.png",
        "flowering_azalea_leaves.png",
        "gilded_blackstone.png",
        "reinforced_deepslate.png",
        "sculk_catalyst.png",
      ],
    },
  },

  Axl0: {
    path: "assets/icons/Axl0",
    galleries: {
      Dimetric: [
        "bookshelf_di.png",
        "bricks_di.png",
        "coal_block_di.png",
        "lego_block_di.png",
        "the_crew_di.png",
        "trailer_dirt_di.png",
        "trailer_grass_di.png",
      ],
      Patchwork: [
        "bookshelf_patchwork.png",
        "bricks_patchwork.png",
        "coal_block_patchwork.png",
        "lego_block_patchwork.png",
        "the_crew_patchwork.png",
        "trailer_dirt_patchwork.png",
        "trailer_grass_patchwork.png",
      ],
      Isometric: [
        "bookshelf_iso.png",
        "bricks_iso.png",
        "coal_block_iso.png",
        "lego_block_iso.png",
        "the_crew_iso.png",
        "trailer_dirt_iso.png",
        "trailer_grass_iso.png",
      ],
    },
  },

  Cubeoidal: { path: "assets/icons/Cubeoidal", galleries: {} },
  IcyCrystal: { path: "assets/icons/IcyCrystal", galleries: {} },
  ImXR24: { path: "assets/icons/ImXR24", galleries: {} },
  LarsMans: { path: "assets/icons/LarsMans", galleries: {} },
  MiffenKop: { path: "assets/icons/MiffenKop", galleries: {} },
  Mojang: { path: "assets/icons/Mojang", galleries: {} },
  ommer15: { path: "assets/icons/ommer15", galleries: {} },
};

const categoryPaths = {
  Dimetric: "dimetric",
  Patchwork: "patchwork",
  Isometric: "isometric",
};

const main = document.querySelector("main");
const navTabs = document.querySelector(".nav-tabs");

const createImage = (src, author, category) => {
  const image = document.createElement("img");
  image.src = src;
  image.alt = `${category} icon by ${author}`;
  image.loading = "lazy";
  return image;
};

const getImageUrl = (author, category, fileName) => {
  const basePath = galleryData[author].path;
  if (author === "axialeaa") return `${basePath}/${fileName}`;
  return `${basePath}/${categoryPaths[category]}/${fileName}`;
};

const createGallery = (author, category, imageFiles) => {
  const gallery = document.createElement("div");
  gallery.className = "gallery";

  imageFiles.forEach((fileName) => {
    const image = createImage(
      getImageUrl(author, category, fileName),
      author,
      category,
    );
    gallery.appendChild(image);
  });

  return gallery;
};

const createAuthorSection = (author, { galleries }) => {
  const section = document.createElement("section");
  section.className = "gallery-section";
  section.id = `by_${author}`;

  const heading = document.createElement("h2");
  heading.textContent = `Icons by ${author}`;
  section.appendChild(heading);

  Object.entries(galleries).forEach(([category, imageFiles]) => {
    const categoryHeading = document.createElement("h3");
    categoryHeading.textContent = category;
    section.append(
      categoryHeading,
      createGallery(author, category, imageFiles),
    );
  });

  return section;
};

const createNavTabs = () => {
  if (!navTabs) return;

  Object.keys(galleryData).forEach((author, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `nav-tab${index === 0 ? " active" : ""}`;
    button.textContent = author;
    button.addEventListener("click", () => {
      document
        .querySelector(`#by_${author}`)
        ?.scrollIntoView({ behavior: "smooth" });
      document.querySelectorAll(".nav-tab").forEach((tab) => {
        tab.classList.toggle("active", tab === button);
      });
    });

    navTabs.appendChild(button);
  });
};

if (main) {
  Object.entries(galleryData).forEach(([author, authorData]) => {
    if (Object.keys(authorData.galleries).length > 0) {
      main.appendChild(createAuthorSection(author, authorData));
    }
  });
}

createNavTabs();
