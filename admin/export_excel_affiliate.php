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


/** Error reporting */
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('Europe/London');

if (PHP_SAPI == 'cli')
    die('This example should only be run from a Web Browser');

/** Include PHPExcel */
require_once '../lib/phpexcel/Classes/PHPExcel.php';


$fileName = 'setting_affiliate.xls';



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

$accountId = $_SESSION['user_id'];

$objWriter = PHPExcel_IOFactory::createWriter(makeExportData($objPHPExcel, $accountId), 'Excel5');
$objWriter->save('php://output');

exit;

function makeExportData($phpExcel, $accountId)
{
    $dbApi = DBApi::getInstance();
    $crmList = $dbApi->getAllCrmByAccountId($accountId);
    $affList = $dbApi->getAllAffiliate();

    $activeSheet = $phpExcel->setActiveSheetIndex(0);
    $activeSheet->setTitle('affiliate');

    $activeSheet->setCellValue('A2', 'Affiliate ID');
    $activeSheet->setCellValue('B2', 'Affiliate Label');
    $activeSheet->setCellValue('C1', 'Goals');

    $activeSheet->getColumnDimension('A')->setWidth(15);
    $activeSheet->getColumnDimension('B')->setWidth(20);

    $crmPos = 'C';
    for ($i = 0; $i < sizeof($crmList); $i ++)
    {
        $activeSheet->setCellValue($crmPos.'2', $crmList[$i][1]);
        $activeSheet->getColumnDimension($crmPos)->setWidth(15);

        $crmPos ++;
    }

    for ($i = 0; $i < sizeof($affList); $i ++)
    {
        $activeSheet->setCellValue('A'.($i + 3), $affList[$i][0]);
        $activeSheet->setCellValue('B'.($i + 3), $affList[$i][1]);

        $crmPos = 'C';
        for ($j = 0; $j < sizeof($crmList); $j ++)
        {
            for ($k = 0; $k < sizeof($affList[$i][2]); $k ++)
            {
                if ($crmList[$j][0] == $affList[$i][2][$k][0])
                {
                    $activeSheet->setCellValue($crmPos.($i + 3), $affList[$i][2][$k][1]);
                    break;
                }
            }

            $crmPos ++;
        }
    }

    return $phpExcel;
}

?>