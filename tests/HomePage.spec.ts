import { test, expect } from '@playwright/test';


test.describe.serial('CnnTurk Anasayfa Testi', () => {

    test.beforeEach(async ({ page }) => {
        console.log('Test başlıyor...');
        await page.goto('https://cnnturk.com');



    });
    test.setTimeout(60000); // Test için 60 saniye zaman aşımı

    test.afterEach(async ({ page }) => {
        console.log('Test bitti...');
        await page.close();
    });


    test('Title Dogrulama', async ({page}) => {

        let actualTitle = 'CNN TÜRK Haber - Son Dakika Haberler';
        let expectedTitle = await page.title();
        await expect(actualTitle).toBe(expectedTitle);


    })

    test('Kaydırmalı Son Dakika Haberler', async ({page}) => {

        await page.waitForSelector('//*[@class="swiper-pagination-bullet"]');
        const swipperPaginations = await page.locator('//*[@class=\'swiper-pagination-bullet\']');
        const paginationCount = await swipperPaginations.count();
        console.log(`Toplam pagination sayısı: ${paginationCount}`);


        for (let i = 0; i < Math.min(16, paginationCount); i++) {
            await swipperPaginations.nth(i).hover(); // Her bir pagination elemanını kontrol et
            await page.waitForTimeout(1000); // İçerik yüklenmesi için bekle

        }

        //3. Haberin başlığını al ve doğruluğunu kontrol et.
        const thirdSwipperPagination = await page.locator('.swiper-slide-active img[alt]').nth(2).getAttribute('alt');
        console.log(`Başlık (3. sıradaki img): ${thirdSwipperPagination}`);


    })
})