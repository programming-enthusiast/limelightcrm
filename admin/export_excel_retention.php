<?php

require_once '../daemon/api/DBApi.php';
// check client ip
$dbApi = DBApi::getInstance();
if(!$dbApi->checkClientIp())
{
    header("Location: blockip_alert.php");
    return;
}
session_start();

if (!isset($_SESSION['user']) || $_SESSION['user'] == '')
    header("Location: ../login.php");

$exportType = $_GET['type'];
$userToken = $_GET['user_token'];
$campaignLabels = $_GET['campaign_labels'];
$fromDate = $_GET['from_date'];
$toDate = $_GET['to_date'];

/** Error reporting */
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('Europe/London');

if (PHP_SAPI == 'cli')
    die('This example should only be run from a Web Browser');

/** Include PHPExcel */
require_once '../lib/phpexcel/Classes/PHPExcel.php';


$fileName = $exportType.'_'.$fromDate.'_'.$toDate.'.xls';



// Create new PHPExcel object
$objPHPExcel = new PHPExcel();

// Set document properties
$objPHPExcel->getProperties()->setCreator("Maarten Balliauw")
                             ->setLastModifiedBy("Maarten Balliauw")
                             ->setTitle("Office 2007 XLSX Test Document")
                             ->setSubject("Office 2007 XLSX Test Document")
                             ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
                             ->setKeywords("office 2007 openxml php")
                             ->setCategory("Test result file");

// Redirect output to a client’s web browser (Excel5)
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="'.$fileName.'"');
header('Cache-Control: max-age=0');
// If you're serving to IE 9, then the following may be needed
header('Cache-Control: max-age=1');

// If you're serving to IE over SSL, then the following may be needed
header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
header ('Pragma: public'); // HTTP/1.0

$objWriter = PHPExcel_IOFactory::createWriter(makeExportData($objPHPExcel, $userToken, $fromDate, $toDate, $campaignLabels), 'Excel5');
$objWriter->save('php://output');

exit;

function makeExportData($phpExcel, $userToken, $fromDate, $toDate, $campaignLabels)
{
    //$userToken = '1489953135599';   // for testing

    $styleCampaign = array(
        'font' => array(
            'bold' => true,
            'size' => 17
        )
    );

    $styleAffiliate = array(
        'font' => array(
            'bold' => true,
            'size' => 13
        )
    );


    $dbApi = DBApi::getInstance();
    $crmList = $dbApi->GetCRMList4Export($userToken);

    $initSheet = true;
    for ($i = 0; $i < sizeof($crmList); $i ++) 
    {
        if ($i > 0)
            $phpExcel->createSheet();

        $activeSheet = $phpExcel->setActiveSheetIndex($i);
        $activeSheet->setTitle($crmList[$i][1]);

        // set columns width
        $activeSheet->getColumnDimension('A')->setWidth(15);
        $activeSheet->getColumnDimension('B')->setWidth(13);
        $activeSheet->getColumnDimension('C')->setWidth(13);
        $activeSheet->getColumnDimension('D')->setWidth(15);
        $activeSheet->getColumnDimension('E')->setWidth(13);
        $activeSheet->getColumnDimension('F')->setWidth(15);
        $activeSheet->getColumnDimension('G')->setWidth(15);
        $activeSheet->getColumnDimension('H')->setWidth(10);
        $activeSheet->getColumnDimension('I')->setWidth(13);
        $activeSheet->getColumnDimension('J')->setWidth(13);
        $activeSheet->getColumnDimension('K')->setWidth(15);
        $activeSheet->getColumnDimension('L')->setWidth(13);
        $activeSheet->getColumnDimension('M')->setWidth(15);
        $activeSheet->getColumnDimension('N')->setWidth(15);

        $activeSheet->setCellValue('A1', 'CRM Name');
        $activeSheet->setCellValue('B1', $crmList[$i][1]);
        $activeSheet->setCellValue('A2', 'Campaign Labels');
        $activeSheet->setCellValue('B2', $campaignLabels);
        $activeSheet->setCellValue('A3', 'From Date');
        $activeSheet->setCellValue('B3', $fromDate);
        $activeSheet->setCellValue('A4', 'To Date');
        $activeSheet->setCellValue('B4', $toDate);

        $campaignList = $dbApi->GetCampaignList4Export($crmList[$i][0], $userToken);
        $row = 4;
        for ($j = 0; $j < sizeof($campaignList); $j ++) 
        {
            // check campaign labels
            if ($campaignLabels != '' && $campaignLabels != $campaignList[$j][2])
                continue;

            // set campaign id & name
            $row += 3;
            $activeSheet->setCellValue('A'.$row, '('.$campaignList[$j][0].') '.$campaignList[$j][1]);
            $activeSheet->getStyle('A'.$row)->applyFromArray($styleCampaign);

            // campaign labels
            //$activeSheet->setCellValue('E'.$row, $campaignList[$j][2]);

            // set cycle kind
            $row += 2;
            $activeSheet->setCellValue('B'.$row, 'Initial Cycle');
            $activeSheet->setCellValue('I'.$row, 'Subscription Cycle');

            // set cycle title
            $row ++;
            $activeSheet->setCellValue('A'.$row, 'Affiliate ID');
            $activeSheet->setCellValue('B'.$row, 'Gross Orders');
            $activeSheet->setCellValue('C'.$row, 'Net Approved');
            $activeSheet->setCellValue('D'.$row, 'Void/Full Refund');
            $activeSheet->setCellValue('E'.$row, 'Partial Refund');
            $activeSheet->setCellValue('F'.$row, 'Void/Refund Revenue');
            $activeSheet->setCellValue('G'.$row, 'Approval Rate');
            $activeSheet->setCellValue('I'.$row, 'Gross Orders');
            $activeSheet->setCellValue('J'.$row, 'Net Approved');
            $activeSheet->setCellValue('K'.$row, 'Void/Full Refund');
            $activeSheet->setCellValue('L'.$row, 'Partial Refund');
            $activeSheet->setCellValue('M'.$row, 'Void/Refund Revenue');
            $activeSheet->setCellValue('N'.$row, 'Conversion');

            // set affiliate sum
            $affiliateList = $dbApi->GetAffiliateList4Export($crmList[$i][0], $campaignList[$j][0], $userToken);
            for ($k = 0; $k < sizeof($affiliateList); $k ++) 
            {
                // set affiliate data
                $row ++;
                $activeSheet->setCellValue('A'.$row, $affiliateList[$k][0]);
                $activeSheet->setCellValue('B'.$row, $affiliateList[$k][2]);
                $activeSheet->setCellValue('C'.$row, $affiliateList[$k][3]);
                $activeSheet->setCellValue('D'.$row, $affiliateList[$k][4]);
                $activeSheet->setCellValue('E'.$row, $affiliateList[$k][5]);
                $activeSheet->setCellValue('F'.$row, '$'.$affiliateList[$k][6]);
                $activeSheet->setCellValue('G'.$row, $affiliateList[$k][7].'%');
                $activeSheet->setCellValue('I'.$row, $affiliateList[$k][8]);
                $activeSheet->setCellValue('J'.$row, $affiliateList[$k][9]);
                $activeSheet->setCellValue('K'.$row, $affiliateList[$k][10]);
                $activeSheet->setCellValue('L'.$row, $affiliateList[$k][11]);
                if ($affiliateList[$k][12] == '')
                    $activeSheet->setCellValue('M'.$row, $affiliateList[$k][12]);
                else
                    $activeSheet->setCellValue('M'.$row, '$'.$affiliateList[$k][12]);
                if ($affiliateList[$k][13] == '')
                    $activeSheet->setCellValue('N'.$row, $affiliateList[$k][13]);
                else
                    $activeSheet->setCellValue('N'.$row, $affiliateList[$k][13].'%');
            }

            // set campaign total in affiliate list
            $row ++;
            $activeSheet->setCellValue('A'.$row, 'Total');
            $activeSheet->setCellValue('B'.$row, $campaignList[$j][3]);
            $activeSheet->setCellValue('C'.$row, $campaignList[$j][4]);
            $activeSheet->setCellValue('D'.$row, $campaignList[$j][5]);
            $activeSheet->setCellValue('E'.$row, $campaignList[$j][6]);
            $activeSheet->setCellValue('F'.$row, '$'.$campaignList[$j][7]);
            $activeSheet->setCellValue('G'.$row, $campaignList[$j][8].'%');
            $activeSheet->setCellValue('I'.$row, $campaignList[$j][9]);
            $activeSheet->setCellValue('J'.$row, $campaignList[$j][10]);
            $activeSheet->setCellValue('K'.$row, $campaignList[$j][11]);
            $activeSheet->setCellValue('L'.$row, $campaignList[$j][12]);
            if ($campaignList[$j][13] == '')
                $activeSheet->setCellValue('M'.$row, $campaignList[$j][13]);
            else
                $activeSheet->setCellValue('M'.$row, '$'.$campaignList[$j][13]);
            if ($campaignList[$j][14] == '')
                $activeSheet->setCellValue('N'.$row, $campaignList[$j][14]);
            else
                $activeSheet->setCellValue('N'.$row, $campaignList[$j][14].'%');

            for ($k = 0; $k < sizeof($affiliateList); $k ++) 
            {
                // set affiliate id
                $row += 3;
                $activeSheet->setCellValue('A'.$row, 'AffID '.$affiliateList[$k][0]);
                $activeSheet->getStyle('A'.$row)->applyFromArray($styleAffiliate);

                // set cycle kind
                $row += 2;
                $activeSheet->setCellValue('B'.$row, 'Initial Cycle');
                $activeSheet->setCellValue('I'.$row, 'Subscription Cycle');

                // set cycle title for sub affiliate
                $row += 1;
                $activeSheet->setCellValue('A'.$row, 'Sub-Affiliate ID');
                $activeSheet->setCellValue('B'.$row, 'Gross Orders');
                $activeSheet->setCellValue('C'.$row, 'Net Approved');
                $activeSheet->setCellValue('D'.$row, 'Void/Full Refund');
                $activeSheet->setCellValue('E'.$row, 'Partial Refund');
                $activeSheet->setCellValue('F'.$row, 'Void/Refund Revenue');
                $activeSheet->setCellValue('G'.$row, 'Approval Rate');
                $activeSheet->setCellValue('I'.$row, 'Gross Orders');
                $activeSheet->setCellValue('J'.$row, 'Net Approved');
                $activeSheet->setCellValue('K'.$row, 'Void/Full Refund');
                $activeSheet->setCellValue('L'.$row, 'Partial Refund');
                $activeSheet->setCellValue('M'.$row, 'Void/Refund Revenue');
                $activeSheet->setCellValue('N'.$row, 'Conversion');

                // set sub affliate data
                $subAffiliateList = $dbApi->GetSubAffiliateList4Export($crmList[$i][0], $campaignList[$j][0], $affiliateList[$k][0], $userToken);
                for ($l = 0; $l < sizeof($subAffiliateList); $l ++) 
                {
                    $row ++;
                    $activeSheet->setCellValue('A'.$row, $subAffiliateList[$l][0]);
                    $activeSheet->setCellValue('B'.$row, $subAffiliateList[$l][2]);
                    $activeSheet->setCellValue('C'.$row, $subAffiliateList[$l][3]);
                    $activeSheet->setCellValue('D'.$row, $subAffiliateList[$l][4]);
                    $activeSheet->setCellValue('E'.$row, $subAffiliateList[$l][5]);
                    $activeSheet->setCellValue('F'.$row, '$'.$subAffiliateList[$l][6]);
                    $activeSheet->setCellValue('G'.$row, $subAffiliateList[$l][7].'%');
                    $activeSheet->setCellValue('I'.$row, $subAffiliateList[$l][8]);
                    $activeSheet->setCellValue('J'.$row, $subAffiliateList[$l][9]);
                    $activeSheet->setCellValue('K'.$row, $subAffiliateList[$l][10]);
                    $activeSheet->setCellValue('L'.$row, $subAffiliateList[$l][11]);
                    if ($subAffiliateList[$l][12] == '')
                        $activeSheet->setCellValue('M'.$row, $subAffiliateList[$l][12]);
                    else
                        $activeSheet->setCellValue('M'.$row, '$'.$subAffiliateList[$l][12]);
                    if ($subAffiliateList[$l][13] == '')
                        $activeSheet->setCellValue('N'.$row, $subAffiliateList[$l][13]);
                    else
                        $activeSheet->setCellValue('N'.$row, $subAffiliateList[$l][13].'%');
                }

                // set affiliate total in sub affiliate list
                $row ++;
                $activeSheet->setCellValue('A'.$row, 'Total');
                $activeSheet->setCellValue('B'.$row, $affiliateList[$k][2]);
                $activeSheet->setCellValue('C'.$row, $affiliateList[$k][3]);
                $activeSheet->setCellValue('D'.$row, $affiliateList[$k][4]);
                $activeSheet->setCellValue('E'.$row, $affiliateList[$k][5]);
                $activeSheet->setCellValue('F'.$row, '$'.$affiliateList[$k][6]);
                $activeSheet->setCellValue('G'.$row, $affiliateList[$k][7].'%');
                $activeSheet->setCellValue('I'.$row, $affiliateList[$k][8]);
                $activeSheet->setCellValue('J'.$row, $affiliateList[$k][9]);
                $activeSheet->setCellValue('K'.$row, $affiliateList[$k][10]);
                $activeSheet->setCellValue('L'.$row, $affiliateList[$k][11]);
                if ($affiliateList[$k][12] == '')
                    $activeSheet->setCellValue('M'.$row, $affiliateList[$k][12]);
                else
                    $activeSheet->setCellValue('M'.$row, '$'.$affiliateList[$k][12]);
                if ($affiliateList[$k][13] == '')
                    $activeSheet->setCellValue('N'.$row, $affiliateList[$k][13]);
                else
                    $activeSheet->setCellValue('N'.$row, $affiliateList[$k][13].'%');
            }
        }
    }

    // Set active sheet index to the first sheet, so Excel opens this as the first sheet
    $phpExcel->setActiveSheetIndex(0);

    return $phpExcel;
}

?>